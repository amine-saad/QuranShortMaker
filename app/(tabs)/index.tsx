import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/ui/SearchBar';
import SurahCard from '@/components/feature/SurahCard';
import { searchSurahs, SURAHS } from '@/services/quran-service';
import { Surah } from '@/types';
import { Colors, Typography, Spacing } from '@/constants/theme';

export default function BrowseScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>(SURAHS);

  useEffect(() => {
    const performSearch = async () => {
      if (searchQuery.trim() === '') {
        setFilteredSurahs(SURAHS);
      } else {
        const results = await searchSurahs(searchQuery);
        setFilteredSurahs(results);
      }
    };
    performSearch();
  }, [searchQuery]);

  const handleSurahPress = (surah: Surah) => {
    router.push({
      pathname: '/configure',
      params: { surahId: surah.id.toString() },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Quran Short Maker</Text>
        <Text style={styles.subtitle}>Create beautiful recitation videos</Text>
        <View style={styles.privacyBadge}>
          <Text style={styles.privacyText}>🔒 All processing on-device</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Surahs..."
        />
      </View>

      <FlatList
        data={filteredSurahs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SurahCard surah={item} onPress={() => handleSurahPress(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  privacyBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  privacyText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.accent,
  },
  searchContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },
});
