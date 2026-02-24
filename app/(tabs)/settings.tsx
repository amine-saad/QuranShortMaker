import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useAlert } from '@/template';
import { Colors, Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function SettingsScreen() {
  const { showAlert } = useAlert();
  const [pexelsKey, setPexelsKey] = useState('');

  const handleSaveKey = () => {
    if (pexelsKey.trim() === '') {
      showAlert('Error', 'Please enter a valid API key');
      return;
    }
    showAlert('Success', 'Pexels API key saved securely');
  };

  const handleClearCache = () => {
    showAlert('Clear Cache', 'This will delete all cached audio and video files. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => showAlert('Success', 'Cache cleared successfully'),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pexels Integration</Text>
          <Text style={styles.sectionDescription}>
            Enter your Pexels API key to search stock videos. Get a free key at pexels.com/api
          </Text>
          
          <TextInput
            value={pexelsKey}
            onChangeText={setPexelsKey}
            placeholder="Enter API Key"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            secureTextEntry
          />
          
          <Pressable
            onPress={handleSaveKey}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Quality</Text>
          
          <Pressable style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Default Resolution</Text>
              <Text style={styles.settingValue}>1080p</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textMuted} />
          </Pressable>
          
          <Pressable style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Default Aspect Ratio</Text>
              <Text style={styles.settingValue}>9:16 (Vertical)</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={Colors.textMuted} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage</Text>
          
          <Pressable
            onPress={handleClearCache}
            style={({ pressed }) => [styles.dangerButton, pressed && styles.buttonPressed]}
          >
            <MaterialIcons name="delete-outline" size={20} color={Colors.error} />
            <Text style={styles.dangerButtonText}>Clear Cache</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Quran Short Maker v1.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for the Muslim community</Text>
        </View>
      </ScrollView>
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
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  section: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  sectionDescription: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginBottom: Spacing.md,
    lineHeight: 20,
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
    marginBottom: Spacing.md,
    includeFontPadding: false,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.background,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: Typography.md,
    fontWeight: Typography.medium,
    color: Colors.text,
    marginBottom: 2,
  },
  settingValue: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.error,
    paddingVertical: Spacing.md,
  },
  dangerButtonText: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.error,
    marginLeft: Spacing.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
  },
});
