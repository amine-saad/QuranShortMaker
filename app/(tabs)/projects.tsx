import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ProjectCard } from '@/components';
import { useProjects } from '@/hooks/useProjects';
import { useAlert } from '@/template';
import { Colors, Typography, Spacing } from '@/constants/theme';

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, loading, deleteProject, duplicateProject } = useProjects();
  const { showAlert } = useAlert();

  const handleDelete = (id: string) => {
    showAlert('Delete Project', 'Are you sure you want to delete this project?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteProject(id);
          showAlert('Success', 'Project deleted');
        },
      },
    ]);
  };

  const handleDuplicate = async (id: string) => {
    const duplicate = await duplicateProject(id);
    if (duplicate) {
      showAlert('Success', 'Project duplicated');
    }
  };

  const handleResume = (project: any) => {
    router.push({
      pathname: '/configure',
      params: {
        surahId: project.surahId.toString(),
        projectId: project.id,
      },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Projects</Text>
        {projects.length > 0 && (
          <Text style={styles.subtitle}>{projects.length} saved project{projects.length !== 1 ? 's' : ''}</Text>
        )}
      </View>

      {projects.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="video-library" size={80} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>No projects yet</Text>
          <Text style={styles.emptyText}>
            Create your first Quran short video by browsing Surahs
          </Text>
        </View>
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard
              project={item}
              onPress={() => handleResume(item)}
              onDelete={() => handleDelete(item.id)}
              onDuplicate={() => handleDuplicate(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: Typography.sm,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    marginTop: 4,
  },
  list: {
    padding: Spacing.md,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.semibold,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.md,
    fontWeight: Typography.regular,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
