import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type RefreshErrorBannerProps = {
  message: string;
  onRetry: () => void;
};

export function RefreshErrorBanner({
  message,
  onRetry,
}: RefreshErrorBannerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Refresh failed</Text>

        <Text
          numberOfLines={2}
          style={styles.message}
        >
          {message}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry weather refresh"
        onPress={onRetry}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Retry</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  textGroup: {
    flex: 1,
  },

  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.danger,
  },

  message: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.textInverse,
  },
});