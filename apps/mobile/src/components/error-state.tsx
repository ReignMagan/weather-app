import { Button, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

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
      <Text style={styles.message}>
        {message}
      </Text>

      <Button
        title="Try Again"
        onPress={onRetry}
      />
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
    gap: spacing.lg,
  },

  message: {
    fontSize: typography.size.md,
    color: colors.danger,
    textAlign: 'center',
  },
});