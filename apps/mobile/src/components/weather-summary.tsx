import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

import type { WeatherCondition } from '../types/weather';
import { getWeatherIcon } from '../utils/weather-icon';

type WeatherSummaryProps = {
  location: string;
  temperature: number;
  condition: WeatherCondition;
  conditionLabel: string;
  apparentTemperature: number;
};

export function WeatherSummary({
  location,
  temperature,
  condition,
  conditionLabel,
  apparentTemperature,
}: WeatherSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>{location}</Text>

    <Text style={styles.temperature}>
        {Math.round(temperature)}°
    </Text>

    <Text style={styles.icon}>
        {getWeatherIcon(condition)}
    </Text>

    <Text style={styles.condition}>
        {conditionLabel}
    </Text>

      <Text style={styles.feelsLike}>
        Feels like {Math.round(apparentTemperature)}°
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  location: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  temperature: {
    fontSize: typography.size.display,
    fontWeight: typography.weight.regular,
    color: colors.textPrimary,
  },

  icon: {
    fontSize: 56,
  },

  condition: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.medium,
    color: colors.textPrimary,
  },

  feelsLike: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
});