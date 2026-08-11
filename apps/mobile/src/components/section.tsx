import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export function Section({
  title,
  children,
}: SectionProps) {
  return (
    <View style={styles.container}>
      {title ? (
        <Text style={styles.title}>
          {title}
        </Text>
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },

  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
});