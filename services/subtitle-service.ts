// Subtitle Generation Service
import * as FileSystem from 'expo-file-system';
import { Ayah, SubtitleConfig } from '@/types';

const SUBTITLE_CACHE_DIR = `${FileSystem.cacheDirectory}quran_subtitles/`;

async function ensureCacheDir() {
  const dirInfo = await FileSystem.getInfoAsync(SUBTITLE_CACHE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(SUBTITLE_CACHE_DIR, { intermediates: true });
  }
}

function formatSRTTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
}

export async function generateSRTSubtitles(
  ayahs: Ayah[],
  audioDurations: number[],
  config: SubtitleConfig
): Promise<string> {
  await ensureCacheDir();
  
  const outputPath = `${SUBTITLE_CACHE_DIR}subtitles_${Date.now()}.srt`;
  let srtContent = '';
  let currentTime = 0;
  
  ayahs.forEach((ayah, index) => {
    const duration = audioDurations[index] || 5; // Default 5 seconds if unknown
    const startTime = currentTime;
    const endTime = currentTime + duration;
    
    // Build subtitle text based on config
    const lines: string[] = [];
    
    if (config.showArabic) {
      lines.push(ayah.textArabic);
    }
    
    if (config.showEnglish) {
      lines.push(ayah.textEnglish);
    }
    
    // SRT format: index, timecode, text, blank line
    srtContent += `${index + 1}\n`;
    srtContent += `${formatSRTTime(startTime)} --> ${formatSRTTime(endTime)}\n`;
    srtContent += lines.join('\n') + '\n\n';
    
    currentTime = endTime;
  });
  
  await FileSystem.writeAsStringAsync(outputPath, srtContent);
  return outputPath;
}

export function estimateAyahDuration(arabicText: string): number {
  // Rough estimation: ~2 seconds per 10 Arabic characters
  // This is a simple heuristic and can be improved
  const baseTime = 2;
  const charCount = arabicText.length;
  return Math.max(3, baseTime + (charCount / 10) * 0.5);
}

export async function clearSubtitleCache(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(SUBTITLE_CACHE_DIR);
  if (dirInfo.exists) {
    await FileSystem.deleteAsync(SUBTITLE_CACHE_DIR, { idempotent: true });
  }
}
