import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { WeatherCondition } from '../types/weather';
import { PixelIcon } from './pixel-icon';
import { colors, spacing, typography } from '../theme';

type Item = {
  time: string;
  temperature: number;
  condition: WeatherCondition;
  conditionLabel: string;
  precipitationProbability: number;
};
type Props = { items: Item[]; temperatureUnit: string; timezone: string };

export function HourlyForecast({ items, temperatureUnit, timezone }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {items.map((item, index) => {
        const selected = index === 0;
        return (
          <View key={item.time} style={[styles.card, selected && styles.selected]}>
            <Text style={[styles.time, selected && styles.inverse]}>
              {selected ? 'NOW' : formatHour(item.time, timezone)}
            </Text>
            <PixelIcon
              name={weatherIcon(item.condition)}
              size={32}
              color={selected ? colors.sunshine : colors.primary}
            />
            <Text style={[styles.temperature, selected && styles.inverse]}>
              {Math.round(item.temperature)}
              {temperatureUnit}
            </Text>
            <Text style={[styles.rain, selected && styles.inverse]}>
              {item.precipitationProbability}% RAIN
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}
function formatHour(time: string, timezone: string) {
  return new Date(time).toLocaleTimeString([], { hour: 'numeric', timeZone: timezone });
}
function weatherIcon(condition: WeatherCondition): 'cloud' | 'cloudSun' {
  return condition === 'clear' ? 'cloudSun' : 'cloud';
}
const styles = StyleSheet.create({
  list: { gap: spacing.sm, paddingRight: spacing.xl, paddingBottom: 5 },
  card: {
    width: 104,
    minHeight: 142,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderWidth: 3,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  selected: { backgroundColor: colors.primary },
  time: {
    fontFamily: 'monospace',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  temperature: {
    fontFamily: 'monospace',
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
  rain: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: typography.weight.bold,
    color: colors.primary,
  },
  inverse: { color: colors.textInverse },
});
