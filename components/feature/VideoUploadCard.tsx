import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { VideoSource } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface VideoUploadCardProps {
  videoSource: VideoSource | null;
  onUpload: () => void;
  onClear: () => void;
  uploading: boolean;
}

export default function VideoUploadCard({
  videoSource,
  onUpload,
  onClear,
  uploading,
}: VideoUploadCardProps) {
  if (!videoSource) {
    return (
      <Pressable
        onPress={onUpload}
        disabled={uploading}
        style={({ pressed }) => [
          styles.uploadButton,
          pressed && styles.uploadButtonPressed,
          uploading && styles.uploadButtonDisabled,
        ]}
      >
        <MaterialIcons
          name="video-library"
          size={48}
          color={uploading ? Colors.textMuted : Colors.primary}
        />
        <Text style={styles.uploadText}>
          {uploading ? 'Loading...' : 'Upload Video'}
        </Text>
        <Text style={styles.uploadSubtext}>MP4, MOV, or WEBM</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.previewContainer}>
      <View style={styles.previewHeader}>
        <View style={styles.previewInfo}>
          <MaterialIcons name="check-circle" size={20} color={Colors.success} />
          <Text style={styles.previewTitle}>Video uploaded</Text>
        </View>
        <Pressable onPress={onClear} style={styles.clearButton}>
          <MaterialIcons name="close" size={20} color={Colors.error} />
        </Pressable>
      </View>

      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: videoSource.thumbnail || videoSource.uri }}
          style={styles.thumbnail}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.playOverlay}>
          <MaterialIcons name="play-circle-filled" size={48} color={Colors.background} />
        </View>
      </View>

      <Pressable
        onPress={onUpload}
        style={({ pressed }) => [styles.changeButton, pressed && styles.changeButtonPressed]}
      >
        <MaterialIcons name="swap-horiz" size={16} color={Colors.primary} />
        <Text style={styles.changeText}>Change Video</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonPressed: {
    opacity: 0.7,
  },
  uploadButtonDisabled: {
    opacity: 0.5,
  },
  uploadText: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  uploadSubtext: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  previewContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  previewInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  previewTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.text,
  },
  clearButton: {
    padding: 4,
  },
  thumbnailContainer: {
    position: 'relative',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.background,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  changeButtonPressed: {
    opacity: 0.7,
  },
  changeText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
});
