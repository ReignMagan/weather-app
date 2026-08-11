import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>⚠️</Text>

        <Text style={styles.title}>
          Unable to load weather
        </Text>

        <Text style={styles.message}>
          {message}
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Try loading weather again"
          onPress={onRetry}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            Try Again
          </Text>
        </Pressable>
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
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
  },

  icon: {
    fontSize: 40,
  },

  title: {
    marginTop: spacing.md,
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    textAlign: 'center',
    color: colors.textPrimary,
  },

  message: {
    marginTop: spacing.sm,
    fontSize: typography.size.md,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  button: {
    marginTop: spacing.xl,
    minWidth: 140,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textInverse,
  },
});