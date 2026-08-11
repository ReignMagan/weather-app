import { StyleSheet, Text, View } from 'react-native';
import type { WeatherCondition } from '../types/weather';
import { PixelIcon } from './pixel-icon';
import { colors, spacing, typography } from '../theme';

type Item = { date: string; temperatureMax: number; temperatureMin: number; condition: WeatherCondition; conditionLabel: string; precipitationProbabilityMax: number };
type Props = { items: Item[]; temperatureUnit: string; timezone: string };

export function DailyForecast({ items, temperatureUnit, timezone }: Props) {
  return <View style={styles.list}>{items.map((item, index) => <View key={item.date} style={[styles.row, index === 0 && styles.selected]}><Text style={[styles.day, index === 0 && styles.inverse]}>{formatDay(item.date, index, timezone).toUpperCase()}</Text><PixelIcon name={item.condition === 'clear' ? 'cloudSun' : 'cloud'} size={28} color={index === 0 ? colors.sunshine : colors.primary} /><View style={styles.condition}><Text numberOfLines={1} style={[styles.conditionText, index === 0 && styles.inverse]}>{item.conditionLabel.toUpperCase()}</Text><Text style={[styles.rain, index === 0 && styles.inverse]}>{item.precipitationProbabilityMax}% RAIN</Text></View><Text style={[styles.temps, index === 0 && styles.inverse]}>{Math.round(item.temperatureMax)} / {Math.round(item.temperatureMin)}{temperatureUnit}</Text><PixelIcon name="chevronRight" size={20} color={index === 0 ? colors.textInverse : colors.textPrimary} /></View>)}</View>;
}
function formatDay(date: string, index: number, timezone: string) { if (index === 0) return 'Today'; return new Date(`${date}T12:00:00`).toLocaleDateString([], { weekday: 'short', timeZone: timezone }); }
const styles = StyleSheet.create({
  list: { borderWidth: 3, borderColor: colors.border, backgroundColor: colors.surface, shadowColor: colors.shadow, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 1, shadowRadius: 0 },
  row: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, borderBottomWidth: 2, borderBottomColor: colors.border }, selected: { backgroundColor: colors.primary },
  day: { width: 48, fontFamily: 'monospace', fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary }, condition: { flex: 1 },
  conditionText: { fontFamily: 'monospace', fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: colors.textPrimary }, rain: { marginTop: 2, fontFamily: 'monospace', fontSize: 10, color: colors.primary },
  temps: { fontFamily: 'monospace', fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary }, inverse: { color: colors.textInverse },
});
