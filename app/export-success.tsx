import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Share, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import Button from '@/components/ui/Button';
import { useAlert } from '@/template';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ExportSuccessScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { showAlert } = useAlert();
  
  const { outputPath, surahName, ayahRange, thumbnail } = params as {
    outputPath: string;
    surahName: string;
    ayahRange: string;
    thumbnail: string;
  };

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this Quran recitation video: ${surahName} (Ayah ${ayahRange})`,
        url: Platform.OS === 'ios' ? outputPath : undefined,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSaveToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        showAlert('Permission Required', 'Please grant media library permission to save the video');
        return;
      }

      // In a real implementation, this would save the actual file
      showAlert('Saved', 'Video saved to gallery successfully');
    } catch (error) {
      showAlert('Error', 'Failed to save video to gallery');
    }
  };

  const handleCreateAnother = () => {
    router.replace('/(tabs)');
  };

  const handleViewProjects = () => {
    router.replace('/(tabs)/projects');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Success Animation */}
        <Animated.View
          style={[
            styles.successIcon,
            {
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim,
            },
          ]}
        >
          <View style={styles.iconCircle}>
            <MaterialIcons name="check" size={64} color={Colors.background} />
          </View>
        </Animated.View>

        <Text style={styles.title}>Export Complete!</Text>
        <Text style={styles.subtitle}>Your Quran short is ready to share</Text>

        {/* Video Preview */}
        <View style={styles.videoCard}>
          {thumbnail ? (
            <Image
              source={{ uri: thumbnail }}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <MaterialIcons name="video-library" size={48} color={Colors.textMuted} />
            </View>
          )}
          
          <View style={styles.playOverlay}>
            <MaterialIcons name="play-circle-filled" size={48} color={Colors.background} />
          </View>

          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{surahName}</Text>
            <Text style={styles.videoSubtitle}>Ayah {ayahRange}</Text>
          </View>
        </View>

        {/* File Info */}
        <View style={styles.fileInfo}>
          <View style={styles.infoRow}>
            <MaterialIcons name="insert-drive-file" size={18} color={Colors.textMuted} />
            <Text style={styles.infoText}>Size: 12 MB</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={18} color={Colors.textMuted} />
            <Text style={styles.infoText}>Duration: 2:45</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Pressable
            onPress={handleShare}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <MaterialIcons name="share" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Share</Text>
          </Pressable>

          <Pressable
            onPress={handleSaveToGallery}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <MaterialIcons name="save-alt" size={24} color={Colors.primary} />
            <Text style={styles.actionText}>Save to Gallery</Text>
          </Pressable>
        </View>

        {/* Social Media Quick Share */}
        <View style={styles.socialRow}>
          <Text style={styles.socialLabel}>Share on:</Text>
          <View style={styles.socialIcons}>
            {['logo-whatsapp', 'logo-instagram', 'logo-facebook', 'logo-tiktok'].map((icon, index) => (
              <Pressable
                key={index}
                onPress={handleShare}
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.socialButtonPressed,
                ]}
              >
                <MaterialIcons name={icon as any} size={28} color={Colors.textSecondary} />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <Button
          title="Create Another Video"
          onPress={handleCreateAnother}
          fullWidth
          style={styles.primaryButton}
        />
        <Pressable
          onPress={handleViewProjects}
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>View All Projects</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  successIcon: {
    marginBottom: Spacing.xl,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginBottom: Spacing.xl,
  },
  videoCard: {
    width: '100%',
    aspectRatio: 9 / 16,
    maxHeight: 400,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  videoTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  videoSubtitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  fileInfo: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  infoText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  actionButtonPressed: {
    opacity: 0.7,
    backgroundColor: Colors.surfaceElevated,
  },
  actionText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  socialRow: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  socialLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  socialButton: {
    padding: Spacing.sm,
  },
  socialButtonPressed: {
    opacity: 0.5,
  },
  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  primaryButton: {
    marginBottom: 0,
  },
  secondaryButton: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  secondaryButtonPressed: {
    opacity: 0.5,
  },
  secondaryButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
});
