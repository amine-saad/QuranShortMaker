// Core Types
export interface Surah {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  revelationPlace: 'makkah' | 'madinah';
  totalAyahs: number;
}

export interface Ayah {
  number: number;
  textArabic: string;
  textEnglish: string;
}

export interface Reciter {
  id: string;
  name: string;
  style: string;
  audioFormat: 'mp3' | 'ogg';
}

export interface VideoSource {
  type: 'upload' | 'pexels';
  uri?: string;
  pexelsId?: number;
  pexelsUrl?: string;
  thumbnail?: string;
}

export interface SubtitleConfig {
  showArabic: boolean;
  showEnglish: boolean;
  fontSize: number;
  color: string;
  position: 'top' | 'center' | 'bottom';
}

export interface ExportConfig {
  aspectRatio: '9:16' | '1:1' | '4:5' | '16:9';
  resolution: '720p' | '1080p';
}

export interface ExportProgress {
  phase: 'preparing' | 'downloading' | 'processing' | 'rendering' | 'finalizing' | 'complete';
  progress: number;
  currentStep?: string;
  estimatedTimeRemaining?: number;
  fileSize?: string;
}

export interface Project {
  id: string;
  surahId: number;
  surahNameArabic: string;
  surahNameEnglish: string;
  ayahStart: number;
  ayahEnd: number;
  reciterId: string;
  reciterName: string;
  videoSource?: VideoSource;
  subtitleConfig: SubtitleConfig;
  exportConfig: ExportConfig;
  createdAt: string;
  updatedAt: string;
}
