import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type DailyForecastItem = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  conditionLabel: string;
  precipitationProbabilityMax: number;
};

type DailyForecastProps = {
  items: DailyForecastItem[];
};

function formatDay(date: string) {
  const parsedDate = new Date(date);

  return parsedDate.toLocaleDateString([], {
    weekday: 'short',
  });
}

export function DailyForecast({
  items,
}: DailyForecastProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Daily Forecast</Text>

      <View style={styles.list}>
        {items.map((item) => (
          <View key={item.date} style={styles.row}>
            <Text style={styles.day}>
              {formatDay(item.date)}
            </Text>

            <View style={styles.conditionContainer}>
              <Text style={styles.condition}>
                {item.conditionLabel}
              </Text>

              <Text style={styles.precipitation}>
                {item.precipitationProbabilityMax}% rain
              </Text>
            </View>

            <View style={styles.temperatureContainer}>
              <Text style={styles.high}>
                {Math.round(item.temperatureMax)}°
              </Text>

              <Text style={styles.low}>
                {Math.round(item.temperatureMin)}°
              </Text>
            </View>
          </View>
        ))}
      </View>
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
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },

  row: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },

  day: {
    width: 44,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  conditionContainer: {
    flex: 1,
  },

  condition: {
    fontSize: typography.size.sm,
    color: colors.textPrimary,
  },

  precipitation: {
    marginTop: spacing.xs,
    fontSize: typography.size.xs,
    color: colors.primary,
  },

  temperatureContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  high: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  low: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
});