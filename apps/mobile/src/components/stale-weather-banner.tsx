import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

export function StaleWeatherBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Showing older weather data
      </Text>

      <Text style={styles.message}>
        Updating with the latest forecast…
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  title: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.warning,
  },

  message: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
});