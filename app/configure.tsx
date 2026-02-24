import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import Button from '@/components/ui/Button';
import VideoUploadCard from '@/components/feature/VideoUploadCard';
import { getSurahById, RECITERS, getAyahs, getReciterById } from '@/services/quran-service';
import { exportVideo, ExportProgress } from '@/services/video-service';
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { useProjects } from '@/hooks/useProjects';
import { useAlert } from '@/template';
import { Surah, Reciter, SubtitleConfig, ExportConfig } from '@/types';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ConfigureScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { showAlert } = useAlert();
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahStart, setAyahStart] = useState('1');
  const [ayahEnd, setAyahEnd] = useState('5');
  const [selectedReciter, setSelectedReciter] = useState<Reciter>(RECITERS[0]);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '4:5' | '16:9'>('9:16');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState<ExportProgress | null>(null);
  const [cancelRequested, setCancelRequested] = useState(false);
  
  const { videoSource, uploading, pickVideo, clearVideo } = useVideoUpload();
  const { saveProject } = useProjects();

  useEffect(() => {
    const loadSurah = async () => {
      const surahId = parseInt(params.surahId as string, 10);
      const loaded = await getSurahById(surahId);
      setSurah(loaded);
      if (loaded) {
        setAyahEnd(Math.min(5, loaded.totalAyahs).toString());
      }
    };
    loadSurah();
  }, [params.surahId]);

  const handleExport = async () => {
    if (!surah) return;

    // Check platform
    if (Platform.OS === 'web') {
      showAlert(
        'Mobile Only Feature',
        'Video export requires native mobile APIs. Please use the OnSpace mobile app or scan the QR code to preview on your device.',
        [
          { text: 'Got it', style: 'default' }
        ]
      );
      return;
    }

    if (!videoSource) {
      showAlert('No Video', 'Please upload a video first');
      return;
    }

    const start = parseInt(ayahStart, 10);
    const end = parseInt(ayahEnd, 10);

    if (start < 1 || end > surah.totalAyahs || start > end) {
      showAlert('Invalid Range', 'Please enter a valid Ayah range');
      return;
    }

    if (end - start + 1 > 10) {
      showAlert('Range Too Large', 'Maximum 10 Ayahs allowed on mobile');
      return;
    }

    setExporting(true);
    setCancelRequested(false);
    
    try {
      // Prepare export configuration
      const subtitles: SubtitleConfig = {
        showArabic: true,
        showEnglish: true,
        fontSize: 24,
        color: '#ffffff',
        position: 'bottom',
      };

      const exportConfig: ExportConfig = {
        aspectRatio,
        resolution,
      };

      // Save project (video metadata only, not full video data)
      try {
        await saveProject({
          surahId: surah.id,
          surahNameArabic: surah.nameArabic,
          surahNameEnglish: surah.nameEnglish,
          ayahStart: start,
          ayahEnd: end,
          reciterId: selectedReciter.id,
          reciterName: selectedReciter.name,
          videoSource,
          subtitleConfig: subtitles,
          exportConfig,
        });
      } catch (saveError: any) {
        console.warn('Could not save project:', saveError);
        // Continue with export even if save fails
      }

      // Fetch Ayahs for the selected range
      const ayahs = await getAyahs(surah.id, start, end);
      
      const outputPath = await exportVideo(
        videoSource,
        ayahs,
        surah.id,
        selectedReciter,
        subtitles,
        exportConfig,
        (prog) => setProgress(prog),
        () => cancelRequested
      );

      // Navigate to success screen
      router.push({
        pathname: '/export-success',
        params: {
          outputPath,
          surahName: surah.nameArabic,
          ayahRange: `${start}-${end}`,
          thumbnail: videoSource?.thumbnail || '',
        },
      });
    } catch (error: any) {
      console.error('Export error:', error);
      if (error.message === 'Export cancelled') {
        showAlert('Cancelled', 'Export cancelled by user');
      } else {
        const errorMessage = error?.message || 'Unknown error occurred';
        showAlert('Export Failed', `Error: ${errorMessage}`);
      }
    } finally {
      setExporting(false);
      setProgress(null);
      setCancelRequested(false);
    }
  };

  const handleCancelExport = () => {
    showAlert('Cancel Export', 'Are you sure you want to cancel the export?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: () => setCancelRequested(true),
      },
    ]);
  };

  if (!surah) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.surahHeader}>
          <Text style={styles.arabicName}>{surah.nameArabic}</Text>
          <Text style={styles.englishName}>{surah.nameEnglish}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Ayah Range</Text>
          <View style={styles.rangeRow}>
            <View style={styles.rangeInput}>
              <Text style={styles.rangeLabel}>From</Text>
              <TextInput
                value={ayahStart}
                onChangeText={setAyahStart}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            <Text style={styles.rangeSeparator}>—</Text>
            <View style={styles.rangeInput}>
              <Text style={styles.rangeLabel}>To</Text>
              <TextInput
                value={ayahEnd}
                onChangeText={setAyahEnd}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>
          <Text style={styles.helperText}>Maximum 10 Ayahs</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background Video</Text>
          <VideoUploadCard
            videoSource={videoSource}
            onUpload={pickVideo}
            onClear={clearVideo}
            uploading={uploading}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Reciter</Text>
          {RECITERS.map((reciter) => (
            <Pressable
              key={reciter.id}
              onPress={() => setSelectedReciter(reciter)}
              style={[
                styles.reciterCard,
                selectedReciter.id === reciter.id && styles.reciterCardSelected,
              ]}
            >
              <View style={styles.radioOuter}>
                {selectedReciter.id === reciter.id && <View style={styles.radioInner} />}
              </View>
              <View style={styles.reciterInfo}>
                <Text style={styles.reciterName}>{reciter.name}</Text>
                <Text style={styles.reciterStyle}>{reciter.style}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Settings</Text>
          
          <Text style={styles.subLabel}>Aspect Ratio</Text>
          <View style={styles.chipRow}>
            {(['9:16', '1:1', '4:5', '16:9'] as const).map((ratio) => (
              <Pressable
                key={ratio}
                onPress={() => setAspectRatio(ratio)}
                style={[
                  styles.chip,
                  aspectRatio === ratio && styles.chipSelected,
                ]}
              >
                <Text style={[
                  styles.chipText,
                  aspectRatio === ratio && styles.chipTextSelected,
                ]}>
                  {ratio}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.subLabel, { marginTop: Spacing.md }]}>Resolution</Text>
          <View style={styles.chipRow}>
            {(['720p', '1080p'] as const).map((res) => (
              <Pressable
                key={res}
                onPress={() => setResolution(res)}
                style={[
                  styles.chip,
                  resolution === res && styles.chipSelected,
                ]}
              >
                <Text style={[
                  styles.chipText,
                  resolution === res && styles.chipTextSelected,
                ]}>
                  {res}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {exporting && progress && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressPhase}>
                  {progress.phase === 'preparing' && '⚙️ Preparing'}
                  {progress.phase === 'downloading' && '⬇️ Downloading Audio'}
                  {progress.phase === 'processing' && '🎬 Processing Video'}
                  {progress.phase === 'rendering' && '📝 Rendering Subtitles'}
                  {progress.phase === 'finalizing' && '✨ Finalizing'}
                  {progress.phase === 'complete' && '✅ Complete!'}
                </Text>
                {progress.currentStep && (
                  <Text style={styles.progressStep}>{progress.currentStep}</Text>
                )}
              </View>
              <Pressable
                onPress={handleCancelExport}
                style={styles.cancelButton}
              >
                <MaterialIcons name="close" size={20} color={Colors.error} />
              </Pressable>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress.progress}%` }]} />
            </View>

            <View style={styles.progressDetails}>
              <Text style={styles.progressText}>{progress.progress}%</Text>
              {progress.estimatedTimeRemaining !== undefined && progress.estimatedTimeRemaining > 0 && (
                <Text style={styles.progressText}>
                  {progress.estimatedTimeRemaining}s remaining
                </Text>
              )}
              {progress.fileSize && (
                <Text style={styles.progressText}>{progress.fileSize}</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={exporting ? 'Exporting...' : 'Export Video'}
          onPress={handleExport}
          disabled={exporting}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: Typography.md,
    color: Colors.textMuted,
  },
  surahHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  arabicName: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.primary,
    marginBottom: 4,
  },
  englishName: {
    fontSize: Typography.lg,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
  },
  section: {
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rangeInput: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.md,
    color: Colors.text,
    textAlign: 'center',
    includeFontPadding: false,
  },
  rangeSeparator: {
    fontSize: Typography.xl,
    color: Colors.textMuted,
    marginHorizontal: Spacing.md,
  },
  helperText: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  reciterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  reciterCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
  },
  reciterInfo: {
    flex: 1,
  },
  reciterName: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  reciterStyle: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
  subLabel: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.background,
  },
  progressSection: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    margin: Spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  progressPhase: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.primary,
    marginBottom: 4,
  },
  progressStep: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textSecondary,
  },
  cancelButton: {
    padding: 4,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  progressDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
  },
  footer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
});
