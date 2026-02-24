import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { VideoSource } from '@/types';

export function useVideoUpload() {
  const [videoSource, setVideoSource] = useState<VideoSource | null>(null);
  const [uploading, setUploading] = useState(false);

  const pickVideo = async (): Promise<boolean> => {
    try {
      setUploading(true);

      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        return false;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setVideoSource({
          type: 'upload',
          uri: asset.uri,
          thumbnail: asset.uri,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Video upload error:', error);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const clearVideo = () => {
    setVideoSource(null);
  };

  return {
    videoSource,
    uploading,
    pickVideo,
    clearVideo,
  };
}
