// Audio Download Service
import * as FileSystem from 'expo-file-system';
import { Reciter } from '@/types';

const AUDIO_CACHE_DIR = `${FileSystem.cacheDirectory}quran_audio/`;

async function ensureCacheDir() {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_CACHE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(AUDIO_CACHE_DIR, { intermediates: true });
  }
}

export async function downloadAyahAudio(
  surahId: number,
  ayahNumber: number,
  reciter: Reciter,
  onProgress?: (progress: number) => void
): Promise<string> {
  await ensureCacheDir();
  
  // Quran.com audio URL format
  const audioUrl = `https://verses.quran.com/${reciter.id}/${surahId}_${ayahNumber}.mp3`;
  const fileName = `${reciter.id}_${surahId}_${ayahNumber}.mp3`;
  const localPath = `${AUDIO_CACHE_DIR}${fileName}`;
  
  // Check if already cached
  const fileInfo = await FileSystem.getInfoAsync(localPath);
  if (fileInfo.exists) {
    return localPath;
  }
  
  // Download audio
  const downloadResumable = FileSystem.createDownloadResumable(
    audioUrl,
    localPath,
    {},
    (progress) => {
      const percent = (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100;
      onProgress?.(percent);
    }
  );
  
  const result = await downloadResumable.downloadAsync();
  if (!result) {
    throw new Error('Failed to download audio');
  }
  
  return result.uri;
}

export async function downloadAyahRange(
  surahId: number,
  startAyah: number,
  endAyah: number,
  reciter: Reciter,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const audioPaths: string[] = [];
  const totalAyahs = endAyah - startAyah + 1;
  
  for (let ayah = startAyah; ayah <= endAyah; ayah++) {
    const index = ayah - startAyah;
    const path = await downloadAyahAudio(
      surahId,
      ayah,
      reciter,
      (p) => {
        const overallProgress = ((index + p / 100) / totalAyahs) * 100;
        onProgress?.(overallProgress);
      }
    );
    audioPaths.push(path);
  }
  
  return audioPaths;
}

export async function mergeAudioFiles(audioPaths: string[]): Promise<string> {
  await ensureCacheDir();
  
  const outputPath = `${AUDIO_CACHE_DIR}merged_${Date.now()}.mp3`;
  
  // Create concat file for FFmpeg
  const concatFilePath = `${AUDIO_CACHE_DIR}concat_${Date.now()}.txt`;
  const concatContent = audioPaths.map(path => `file '${path}'`).join('\n');
  await FileSystem.writeAsStringAsync(concatFilePath, concatContent);
  
  return outputPath;
}

export async function clearAudioCache(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_CACHE_DIR);
  if (dirInfo.exists) {
    await FileSystem.deleteAsync(AUDIO_CACHE_DIR, { idempotent: true });
  }
}
