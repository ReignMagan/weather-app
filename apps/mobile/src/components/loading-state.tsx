import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = 'Loading...',
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={colors.primary} />

        <Text style={styles.title}>Getting things ready</Text>

        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  card: {
    alignItems: 'center',
    padding: spacing.xl,
    borderWidth: 3,
    borderColor: colors.border,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },

  title: {
    marginTop: spacing.lg,
    fontFamily: 'monospace',
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  message: {
    marginTop: spacing.sm,
    fontFamily: 'monospace',
    fontSize: typography.size.md,
    textAlign: 'center',
    color: colors.textSecondary,
  },
});
