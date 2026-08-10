import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type HourlyForecastItem = {
  time: string;
  temperature: number;
  conditionLabel: string;
  precipitationProbability: number;
};

type HourlyForecastProps = {
  items: HourlyForecastItem[];
};

function formatHour(time: string) {
  const date = new Date(time);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
  });
}

export function HourlyForecast({
  items,
}: HourlyForecastProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Hourly Forecast</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map((item) => (
          <View key={item.time} style={styles.card}>
            <Text style={styles.time}>
              {formatHour(item.time)}
            </Text>

            <Text style={styles.temperature}>
              {Math.round(item.temperature)}°
            </Text>

            <Text
              numberOfLines={2}
              style={styles.condition}
            >
              {item.conditionLabel}
            </Text>

            <Text style={styles.precipitation}>
              {item.precipitationProbability}% rain
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: spacing.md,
  },

  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  list: {
    gap: spacing.md,
    paddingRight: spacing.xl,
  },

  card: {
    width: 110,
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  time: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  temperature: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  condition: {
    minHeight: 36,
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },

  precipitation: {
    fontSize: typography.size.xs,
    color: colors.primary,
  },
});