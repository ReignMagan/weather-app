import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = 'Loading...',
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />

      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  message: {
    marginTop: spacing.md,
    fontSize: typography.size.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});