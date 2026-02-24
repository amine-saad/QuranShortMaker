import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Project } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function ProjectCard({ project, onPress, onDelete, onDuplicate }: ProjectCardProps) {
  const swipeX = useRef(new Animated.Value(0)).current;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={styles.thumbnailContainer}>
          {project.videoSource?.thumbnail ? (
            <Image
              source={{ uri: project.videoSource.thumbnail }}
              style={styles.thumbnail}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <MaterialIcons name="video-library" size={32} color={Colors.textMuted} />
            </View>
          )}
          <View style={styles.overlay}>
            <MaterialIcons name="play-circle-filled" size={32} color={Colors.background} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.arabicName}>{project.surahNameArabic}</Text>
          <Text style={styles.englishName}>{project.surahNameEnglish}</Text>
          
          <View style={styles.meta}>
            <View style={styles.metaItem}>
              <MaterialIcons name="format-list-numbered" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>
                Ayah {project.ayahStart}-{project.ayahEnd}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="person" size={14} color={Colors.textMuted} />
              <Text style={styles.metaText}>{project.reciterName}</Text>
            </View>
          </View>

          <Text style={styles.date}>{formatDate(project.updatedAt)}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={onDuplicate}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <MaterialIcons name="content-copy" size={20} color={Colors.primary} />
          </Pressable>
          
          <Pressable
            onPress={onDelete}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
  },
  thumbnailContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  arabicName: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: 2,
  },
  englishName: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  meta: {
    gap: Spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: Typography.xs,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
  date: {
    fontSize: Typography.xs,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Spacing.sm,
    gap: Spacing.xs,
  },
  actionButton: {
    padding: Spacing.sm,
  },
  actionButtonPressed: {
    opacity: 0.5,
  },
});
