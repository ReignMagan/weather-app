import { StyleSheet, Text, View } from 'react-native';
import type { WeatherCondition } from '../types/weather';
import { colors, spacing, typography } from '../theme';
import { PixelIcon } from './pixel-icon';

type Props = {
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
  temperature,
  temperatureUnit,
  condition,
  conditionLabel,
  apparentTemperature,
  isDay,
  currentTime,
  timezone,
}: Props) {
  const iconName =
    condition === 'clear' && !isDay
      ? 'moon'
      : condition === 'cloudy' || condition === 'fog'
        ? 'cloud'
        : 'cloudSun';
  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <View style={styles.copy}>
          <Text style={styles.temperature}>
            {Math.round(temperature)}
            {temperatureUnit}
          </Text>
          <Text style={styles.condition}>{conditionLabel.toUpperCase()}</Text>
          <View style={styles.rule} />
          <Text style={styles.meta}>
            FEELS LIKE {Math.round(apparentTemperature)}
            {temperatureUnit}
          </Text>
          <View style={styles.timeRow}>
            <PixelIcon name="clock" size={18} color={colors.textInverse} />
            <Text style={styles.meta}>{formatCurrentTime(currentTime, timezone)}</Text>
          </View>
        </View>
        <View style={styles.weatherIcon}>
          <PixelIcon name={iconName} size={92} color={colors.sunshine} />
        </View>
      </View>
    </View>
  );
}

function formatCurrentTime(value: string, timezone: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
}

const styles = StyleSheet.create({
  shadow: { backgroundColor: colors.shadow, paddingBottom: 6, paddingRight: 6 },
  card: {
    minHeight: 240,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderWidth: 3,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  copy: { flex: 1, zIndex: 1 },
  temperature: {
    fontFamily: 'monospace',
    fontSize: typography.size.display,
    lineHeight: 76,
    fontWeight: typography.weight.bold,
    letterSpacing: -6,
    color: colors.textInverse,
  },
  condition: {
    fontFamily: 'monospace',
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
    color: colors.textInverse,
  },
  rule: {
    width: '88%',
    height: 3,
    marginVertical: spacing.md,
    backgroundColor: colors.textInverse,
  },
  meta: {
    fontFamily: 'monospace',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
    color: colors.textInverse,
  },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md },
  weatherIcon: { width: 104, alignItems: 'center' },
});
