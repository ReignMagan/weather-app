import { StyleSheet, Text, View } from 'react-native';

import type { WeatherCondition } from '../types/weather';
import { colors, radius, spacing, typography } from '../theme';
import { getWeatherIcon } from '../utils/weather-icon';

type WeatherSummaryProps = {
  location: string;
  temperature: number;
  temperatureUnit: string;
  condition: WeatherCondition;
  conditionLabel: string;
  apparentTemperature: number;
  isDay: boolean;
  currentTime: string;
  timezone: string;
};

export function WeatherSummary({
  location,
  temperature,
  temperatureUnit,
  condition,
  conditionLabel,
  apparentTemperature,
  isDay,
  currentTime,
  timezone,
}: WeatherSummaryProps) {
  const icon = condition === 'clear' && !isDay ? '🌙' : getWeatherIcon(condition);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.textGroup}>
          <Text style={styles.location}>{location}</Text>

          <Text style={styles.time}>{formatCurrentTime(currentTime, timezone)}</Text>

          <Text style={styles.temperature}>
            {Math.round(temperature)}
            {temperatureUnit}
          </Text>

          <Text style={styles.condition}>{conditionLabel}</Text>

          <Text style={styles.feelsLike}>
            Feels like {Math.round(apparentTemperature)}
            {temperatureUnit}
          </Text>
        </View>

        <Text style={styles.icon}>{icon}</Text>
      </View>
    </View>
  );
}

function formatCurrentTime(value: string, timezone: string) {
  const date = new Date(value);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.xl,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },

  textGroup: {
    flex: 1,
  },

  location: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
  },

  time: {
    marginTop: spacing.xs,
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  temperature: {
    marginTop: spacing.sm,
    fontSize: typography.size.display,
    fontWeight: typography.weight.regular,
    color: colors.textPrimary,
  },

  condition: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  feelsLike: {
    marginTop: spacing.xs,
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },

  icon: {
    fontSize: 72,
  },
});
