import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { PexelsVideo, searchPexelsVideos, downloadPexelsVideo } from '@/services/pexels-service';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

interface PexelsSearchModalProps {
  visible: boolean;
  apiKey: string;
  onClose: () => void;
  onSelectVideo: (uri: string, thumbnail: string, pexelsId: number) => void;
}

export default function PexelsSearchModal({
  visible,
  apiKey,
  onClose,
  onSelectVideo,
}: PexelsSearchModalProps) {
  const [query, setQuery] = useState('nature');
  const [results, setResults] = useState<PexelsVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const videos = await searchPexelsVideos(query.trim(), apiKey);
      setResults(videos);
    } catch (error: any) {
      console.error('Search error:', error);
      alert(error.message || 'Failed to search videos');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectVideo = async (video: PexelsVideo) => {
    setDownloading(video.id);
    setDownloadProgress(0);

    try {
      const localUri = await downloadPexelsVideo(video, (progress) => {
        setDownloadProgress(progress);
      });

      onSelectVideo(localUri, video.image, video.id);
      onClose();
    } catch (error: any) {
      console.error('Download error:', error);
      alert('Failed to download video');
    } finally {
      setDownloading(null);
      setDownloadProgress(0);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Search Pexels Videos</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={Colors.text} />
            </Pressable>
          </View>

          {/* Search Bar */}
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={handleSearch}
              placeholder="Search for videos..."
              placeholderTextColor={Colors.textMuted}
              style={styles.searchInput}
              returnKeyType="search"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} style={styles.clearButton}>
                <MaterialIcons name="cancel" size={18} color={Colors.textMuted} />
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={handleSearch}
            disabled={loading}
            style={({ pressed }) => [
              styles.searchButton,
              pressed && styles.searchButtonPressed,
              loading && styles.searchButtonDisabled,
            ]}
          >
            <Text style={styles.searchButtonText}>
              {loading ? 'Searching...' : 'Search'}
            </Text>
          </Pressable>
        </View>

        {/* Results */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Searching Pexels...</Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="video-library" size={64} color={Colors.textMuted} />
            <Text style={styles.emptyText}>
              Search for free stock videos from Pexels
            </Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleSelectVideo(item)}
                disabled={downloading !== null}
                style={({ pressed }) => [
                  styles.videoCard,
                  pressed && styles.videoCardPressed,
                  downloading === item.id && styles.videoCardDownloading,
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.videoThumbnail}
                  contentFit="cover"
                  transition={200}
                />

                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{Math.floor(item.duration)}s</Text>
                </View>

                {downloading === item.id ? (
                  <View style={styles.downloadOverlay}>
                    <ActivityIndicator size="small" color={Colors.background} />
                    <Text style={styles.downloadText}>{Math.round(downloadProgress)}%</Text>
                  </View>
                ) : (
                  <View style={styles.playOverlay}>
                    <MaterialIcons
                      name="play-circle-filled"
                      size={32}
                      color={Colors.background}
                    />
                  </View>
                )}

                <View style={styles.videoInfo}>
                  <Text style={styles.videoAuthor} numberOfLines={1}>
                    {item.user.name}
                  </Text>
                </View>
              </Pressable>
            )}
            contentContainerStyle={styles.grid}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  closeButton: {
    padding: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.md,
    color: Colors.text,
    marginLeft: Spacing.sm,
    includeFontPadding: false,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  searchButtonPressed: {
    opacity: 0.8,
  },
  searchButtonDisabled: {
    opacity: 0.5,
  },
  searchButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  grid: {
    padding: Spacing.sm,
  },
  videoCard: {
    flex: 1,
    margin: Spacing.sm,
    maxWidth: '48%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  videoCardPressed: {
    opacity: 0.7,
  },
  videoCardDownloading: {
    opacity: 0.9,
  },
  videoThumbnail: {
    width: '100%',
    aspectRatio: 9 / 16,
    backgroundColor: Colors.background,
  },
  durationBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  durationText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: Colors.background,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  downloadOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    gap: Spacing.sm,
  },
  downloadText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
    color: Colors.background,
  },
  videoInfo: {
    padding: Spacing.sm,
  },
  videoAuthor: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
});
