import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

import type { WeatherCondition } from '../types/weather';
import { getWeatherIcon } from '../utils/weather-icon';

type HourlyForecastItem = {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  conditionLabel: string;
  precipitationProbability: number;
};

type HourlyForecastProps = {
  items: HourlyForecastItem[];
  temperatureUnit: string;
  timezone: string;
};

function formatHour(time: string, timezone: string) {
  const date = new Date(time);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    timeZone: timezone,
  });
}

export function HourlyForecast({
  items,
  temperatureUnit,
  timezone,
}: HourlyForecastProps) {
  return (
    <View style={styles.section}>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {items.map((item, index) => (
          <View
            key={item.time}
            style={[
                styles.card,
                index === 0 && styles.currentCard,
            ]}
            >
            <Text
                style={[
                styles.time,
                index === 0 && styles.currentTime,
                ]}
            >
                {index === 0 ? 'Now' : formatHour(item.time, timezone)}
            </Text>

            <Text style={styles.icon}>
                {getWeatherIcon(item.condition)}
            </Text>

            <Text style={styles.temperature}>
                {Math.round(item.temperature)}°
                {temperatureUnit}
            </Text>

            <Text
                numberOfLines={2}
                style={styles.condition}
            >
                {item.conditionLabel}
            </Text>

            <View style={styles.rainRow}>
                <Text style={styles.rainIcon}>💧</Text>

                <Text style={styles.precipitation}>
                {item.precipitationProbability}%
                </Text>
            </View>
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
    width: 112,
    minHeight: 170,
    padding: spacing.md,
    alignItems: 'center',
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },

  currentCard: {
  backgroundColor: colors.primarySoft,
  },

  time: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    color: colors.textSecondary,
  },

  currentTime: {
    color: colors.primary,
    fontWeight: typography.weight.semibold,
  },

  icon: {
  fontSize: 30,
  },

  temperature: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },
  
  condition: {
    minHeight: 36,
    fontSize: typography.size.sm,
    textAlign: 'center',
    color: colors.textPrimary,
  },

  rainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },

  rainIcon: {
    fontSize: typography.size.xs,
},

  precipitation: {
    fontSize: typography.size.xs,
    color: colors.primary,
  },
});