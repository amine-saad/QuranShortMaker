// Pexels Video Search Service
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const PEXELS_API_KEY_STORAGE = '@pexels_api_key';
const VIDEO_CACHE_DIR = `${FileSystem.cacheDirectory}pexels_videos/`;

export interface PexelsVideo {
  id: number;
  url: string;
  image: string;
  duration: number;
  user: {
    name: string;
    url: string;
  };
  videoFiles: Array<{
    quality: string;
    width: number;
    height: number;
    link: string;
  }>;
}

async function ensureCacheDir() {
  const dirInfo = await FileSystem.getInfoAsync(VIDEO_CACHE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(VIDEO_CACHE_DIR, { intermediates: true });
  }
}

export async function savePexelsApiKey(key: string): Promise<void> {
  await AsyncStorage.setItem(PEXELS_API_KEY_STORAGE, key);
}

export async function getPexelsApiKey(): Promise<string | null> {
  return await AsyncStorage.getItem(PEXELS_API_KEY_STORAGE);
}

export async function searchPexelsVideos(
  query: string,
  apiKey: string,
  perPage: number = 15
): Promise<PexelsVideo[]> {
  try {
    const response = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=portrait`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error('Failed to search videos');
    }

    const data = await response.json();

    return data.videos.map((video: any) => ({
      id: video.id,
      url: video.url,
      image: video.image,
      duration: video.duration,
      user: {
        name: video.user.name,
        url: video.user.url,
      },
      videoFiles: video.video_files.map((file: any) => ({
        quality: file.quality,
        width: file.width,
        height: file.height,
        link: file.link,
      })),
    }));
  } catch (error: any) {
    console.error('Pexels search error:', error);
    throw error;
  }
}

export async function downloadPexelsVideo(
  video: PexelsVideo,
  onProgress?: (progress: number) => void
): Promise<string> {
  await ensureCacheDir();

  // Select best quality HD video file
  const hdFile = video.videoFiles.find(f => f.quality === 'hd') || video.videoFiles[0];
  
  if (!hdFile) {
    throw new Error('No video file available');
  }

  const fileName = `pexels_${video.id}.mp4`;
  const localPath = `${VIDEO_CACHE_DIR}${fileName}`;

  // Check if already cached
  const fileInfo = await FileSystem.getInfoAsync(localPath);
  if (fileInfo.exists) {
    return localPath;
  }

  // Download video
  const downloadResumable = FileSystem.createDownloadResumable(
    hdFile.link,
    localPath,
    {},
    (progress) => {
      const percent = (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) * 100;
      onProgress?.(percent);
    }
  );

  const result = await downloadResumable.downloadAsync();
  if (!result) {
    throw new Error('Failed to download video');
  }

  return result.uri;
}

export async function clearPexelsCache(): Promise<void> {
  const dirInfo = await FileSystem.getInfoAsync(VIDEO_CACHE_DIR);
  if (dirInfo.exists) {
    await FileSystem.deleteAsync(VIDEO_CACHE_DIR, { idempotent: true });
  }
}
