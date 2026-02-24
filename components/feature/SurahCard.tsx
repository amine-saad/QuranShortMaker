import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Surah } from '@/types';
import { Colors, Typography, BorderRadius, Spacing } from '@/constants/theme';

interface SurahCardProps {
  surah: Surah;
  onPress: () => void;
}

export default function SurahCard({ surah, onPress }: SurahCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{surah.id}</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.arabicName}>{surah.nameArabic}</Text>
        <Text style={styles.englishName}>{surah.nameEnglish}</Text>
        <Text style={styles.meta}>
          {surah.nameTransliteration} · {surah.totalAyahs} Ayahs
        </Text>
      </View>
      
      <View style={styles.badge}>
        <MaterialIcons
          name={surah.revelationPlace === 'makkah' ? 'wb-sunny' : 'nights-stay'}
          size={16}
          color={Colors.primary}
        />
        <Text style={styles.badgeText}>
          {surah.revelationPlace === 'makkah' ? 'Makki' : 'Madani'}
        </Text>
      </View>
      
      <MaterialIcons name="chevron-right" size={24} color={Colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  numberText: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  arabicName: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: 2,
  },
  englishName: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  meta: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
    color: Colors.primary,
    marginLeft: 4,
  },
});
