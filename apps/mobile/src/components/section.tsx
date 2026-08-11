import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = { title: string; children: ReactNode };
export function Section({ title, children }: Props) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  section: { gap: spacing.sm },
  title: {
    fontFamily: 'monospace',
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    letterSpacing: 1.5,
    color: colors.textPrimary,
  },
});
