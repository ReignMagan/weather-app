import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

import type { WeatherCondition } from '../types/weather';
import { getWeatherIcon } from '../utils/weather-icon';

type DailyForecastItem = {
  date: string;
  temperatureMax: number;
  temperatureMin: number;
  condition: WeatherCondition;
  conditionLabel: string;
  precipitationProbabilityMax: number;
};

type DailyForecastProps = {
  items: DailyForecastItem[];
  temperatureUnit: string;
  timezone: string;
};

function formatDay(date: string, index: number, timezone: string) {
  if (index === 0) {
    return 'Today';
  }

  const parsedDate = new Date(`${date}T12:00:00`);

  return parsedDate.toLocaleDateString([], {
    weekday: 'short',
    timeZone: timezone,
  });
}

export function DailyForecast({
  items,
  temperatureUnit,
  timezone,
}: DailyForecastProps) {
  return (
    <View style={styles.section}>

      <View style={styles.list}>
        {items.map((item, index) => (
          <View
            key={item.date}
            style={[
                styles.row,
                index === 0 && styles.todayRow,
            ]}
            >
            <Text
                style={[
                    styles.day,
                    index === 0 && styles.todayDay,
                ]}
                >
                {formatDay(item.date, index, timezone)}
            </Text>

            <Text style={styles.icon}>
            {getWeatherIcon(item.condition)}
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
                    {temperatureUnit}
                </Text>

                <Text style={styles.separator}>/</Text>

                <Text style={styles.low}>
                    {Math.round(item.temperatureMin)}°
                    {temperatureUnit}
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
    width: 56,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  conditionContainer: {
    flex: 1,
  },

  icon: {
    fontSize: 24,
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

  todayRow: {
    backgroundColor: colors.primarySoft,
  },

  todayDay: {
    color: colors.primary,
    },
    
    
  separator: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    },

});