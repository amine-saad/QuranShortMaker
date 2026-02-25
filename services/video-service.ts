// Video Processing Service with FFmpeg
import * as FileSystem from 'expo-file-system';
import { FFmpegKit, FFmpegKitConfig, ReturnCode, Statistics } from 'ffmpeg-kit-react-native';
import { ExportConfig, SubtitleConfig, VideoSource, ExportProgress, Reciter, Ayah } from '@/types';
import { downloadAyahRange, mergeAudioFiles } from './audio-service';
import { generateSRTSubtitles, estimateAyahDuration } from './subtitle-service';

const OUTPUT_DIR = `${FileSystem.documentDirectory}QuranShorts/`;

async function ensureOutputDir() {
  const dirInfo = await FileSystem.getInfoAsync(OUTPUT_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(OUTPUT_DIR, { intermediates: true });
  }
}

function getAspectRatioFilter(aspectRatio: string): string {
  // Map aspect ratios to FFmpeg scale and crop filters
  const ratios: Record<string, { width: number; height: number }> = {
    '9:16': { width: 1080, height: 1920 },
    '1:1': { width: 1080, height: 1080 },
    '4:5': { width: 1080, height: 1350 },
    '16:9': { width: 1920, height: 1080 },
  };
  
  const target = ratios[aspectRatio] || ratios['9:16'];
  
  // Scale and crop to aspect ratio
  return `scale=${target.width}:${target.height}:force_original_aspect_ratio=increase,crop=${target.width}:${target.height}`;
}

function getResolutionScale(resolution: string): string {
  const scales: Record<string, string> = {
    '720p': '1280:720',
    '1080p': '1920:1080',
  };
  
  return scales[resolution] || scales['1080p'];
}

export async function exportVideo(
  videoSource: VideoSource | null,
  ayahs: Ayah[],
  surahId: number,
  reciter: Reciter,
  subtitles: SubtitleConfig,
  exportConfig: ExportConfig,
  onProgress?: (progress: ExportProgress) => void,
  onCancel?: () => boolean
): Promise<string> {
  if (!videoSource?.uri) {
    throw new Error('No video source provided');
  }
  
  await ensureOutputDir();
  
  let isCancelled = false;
  const checkCancel = () => {
    if (onCancel && onCancel()) {
      isCancelled = true;
      return true;
    }
    return false;
  };
  
  try {
    // Phase 1: Preparing
    onProgress?.({
      phase: 'preparing',
      progress: 5,
      currentStep: 'Preparing video export...',
      estimatedTimeRemaining: 120,
    });
    
    if (checkCancel()) throw new Error('Export cancelled');
    
    // Phase 2: Downloading Audio
    onProgress?.({
      phase: 'downloading',
      progress: 10,
      currentStep: 'Downloading Quran recitation...',
      estimatedTimeRemaining: 110,
    });
    
    const startAyah = ayahs[0].number;
    const endAyah = ayahs[ayahs.length - 1].number;
    
    const audioPaths = await downloadAyahRange(
      surahId,
      startAyah,
      endAyah,
      reciter,
      (audioProgress) => {
        onProgress?.({
          phase: 'downloading',
          progress: 10 + audioProgress * 0.2,
          currentStep: `Downloading audio ${Math.round(audioProgress)}%...`,
          estimatedTimeRemaining: 100,
        });
      }
    );
    
    if (checkCancel()) throw new Error('Export cancelled');
    
    // Create concat file for audio merging
    const concatFilePath = `${FileSystem.cacheDirectory}concat_${Date.now()}.txt`;
    const concatContent = audioPaths.map(path => `file '${path}'`).join('\n');
    await FileSystem.writeAsStringAsync(concatFilePath, concatContent);
    
    const mergedAudioPath = `${FileSystem.cacheDirectory}merged_${Date.now()}.mp3`;
    
    // Merge audio files
    onProgress?.({
      phase: 'downloading',
      progress: 30,
      currentStep: 'Merging audio files...',
      estimatedTimeRemaining: 90,
    });
    
    const mergeCommand = `-f concat -safe 0 -i "${concatFilePath}" -c copy "${mergedAudioPath}"`;
    const mergeSession = await FFmpegKit.execute(mergeCommand);
    const mergeReturnCode = await mergeSession.getReturnCode();
    
    if (!ReturnCode.isSuccess(mergeReturnCode)) {
      throw new Error('Failed to merge audio files');
    }
    
    if (checkCancel()) throw new Error('Export cancelled');
    
    // Phase 3: Generate Subtitles
    onProgress?.({
      phase: 'rendering',
      progress: 40,
      currentStep: 'Generating subtitles...',
      estimatedTimeRemaining: 80,
    });
    
    const durations = ayahs.map(ayah => estimateAyahDuration(ayah.textArabic));
    const subtitlePath = await generateSRTSubtitles(ayahs, durations, subtitles);
    
    if (checkCancel()) throw new Error('Export cancelled');
    
    // Phase 4: Processing Video
    onProgress?.({
      phase: 'processing',
      progress: 50,
      currentStep: 'Processing video with FFmpeg...',
      estimatedTimeRemaining: 70,
    });
    
    const outputPath = `${OUTPUT_DIR}quran_short_${Date.now()}.mp4`;
    
    // Build FFmpeg command
    const aspectFilter = getAspectRatioFilter(exportConfig.aspectRatio);
    const resolution = getResolutionScale(exportConfig.resolution);
    
    // Subtitle style for better readability
    const subtitleStyle = `force_style='FontName=Arial,FontSize=${subtitles.fontSize},PrimaryColour=&H${subtitles.color.replace('#', '')}&,OutlineColour=&H000000&,Outline=2,Shadow=1,Alignment=${subtitles.position === 'bottom' ? '2' : subtitles.position === 'top' ? '8' : '5'}'`;
    
    const ffmpegCommand = [
      `-i "${videoSource.uri}"`,
      `-i "${mergedAudioPath}"`,
      `-vf "${aspectFilter},scale=${resolution},subtitles='${subtitlePath}':${subtitleStyle}"`,
      `-c:v libx264`,
      `-preset medium`,
      `-crf 23`,
      `-c:a aac`,
      `-b:a 192k`,
      `-shortest`,
      `-y "${outputPath}"`,
    ].join(' ');
    
    // Execute FFmpeg with progress tracking
    let lastProgress = 50;
    const estimatedDuration = durations.reduce((sum, d) => sum + d, 0) * 1000;
    
    FFmpegKitConfig.enableStatisticsCallback((statistics: Statistics) => {
      if (isCancelled) return;
      
      const time = statistics.getTime();
      if (time > 0 && estimatedDuration > 0) {
        // Estimate progress based on time
        const progress = Math.min(95, 50 + (time / estimatedDuration) * 45);
        
        if (progress > lastProgress) {
          lastProgress = progress;
          const remaining = Math.max(5, Math.round((100 - progress) / 2));
          
          onProgress?.({
            phase: 'processing',
            progress: Math.round(progress),
            currentStep: 'Rendering video...',
            estimatedTimeRemaining: remaining,
            fileSize: `${Math.round(progress / 10)}MB`,
          });
        }
      }
    });
    
    const session = await FFmpegKit.execute(ffmpegCommand);
    const returnCode = await session.getReturnCode();
    
    // Disable statistics callback
    FFmpegKitConfig.enableStatisticsCallback(null);
    
    if (checkCancel()) {
      // Clean up output file if cancelled
      await FileSystem.deleteAsync(outputPath, { idempotent: true });
      throw new Error('Export cancelled');
    }
    
    if (!ReturnCode.isSuccess(returnCode)) {
      const output = await session.getOutput();
      console.error('FFmpeg error:', output);
      throw new Error('Video processing failed');
    }
    
    // Phase 5: Finalizing
    onProgress?.({
      phase: 'finalizing',
      progress: 98,
      currentStep: 'Finalizing export...',
      estimatedTimeRemaining: 2,
    });
    
    // Clean up temporary files
    await FileSystem.deleteAsync(concatFilePath, { idempotent: true });
    await FileSystem.deleteAsync(mergedAudioPath, { idempotent: true });
    await FileSystem.deleteAsync(subtitlePath, { idempotent: true });
    audioPaths.forEach(async path => {
      await FileSystem.deleteAsync(path, { idempotent: true });
    });
    
    // Complete
    const fileInfo = await FileSystem.getInfoAsync(outputPath);
    const fileSizeMB = fileInfo.size ? (fileInfo.size / (1024 * 1024)).toFixed(1) : '0';
    
    onProgress?.({
      phase: 'complete',
      progress: 100,
      currentStep: 'Export complete!',
      estimatedTimeRemaining: 0,
      fileSize: `${fileSizeMB}MB`,
    });
    
    return outputPath;
    
  } catch (error: any) {
    // Clean up on error
    FFmpegKitConfig.enableStatisticsCallback(null);
    throw error;
  }
}

export async function clearCache(): Promise<void> {
  const cacheDir = FileSystem.cacheDirectory;
  if (cacheDir) {
    const files = await FileSystem.readDirectoryAsync(cacheDir);
    for (const file of files) {
      if (file.startsWith('quran_') || file.startsWith('concat_') || file.startsWith('merged_')) {
        await FileSystem.deleteAsync(`${cacheDir}${file}`, { idempotent: true });
      }
    }
  }
}
