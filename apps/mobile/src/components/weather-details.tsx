import { StyleSheet, Text, View } from 'react-native';
import { PixelIcon } from './pixel-icon';
import { colors, spacing, typography } from '../theme';
import { formatVisibility } from '../utils/format-visibility';
import { formatPressure } from '../utils/pressure';
import { getWindDirectionLabel } from '../utils/wind-direction';

type Props = { humidity: number; windSpeed: number; windSpeedUnit: string; windGusts: number; windDirection: number; pressure: number; visibility: number; precipitation: number; rain: number; pressureUnit: string; visibilityUnit: string; precipitationUnit: string };
type IconName = 'cloud' | 'eye' | 'speed' | 'wind';

export function WeatherDetails({ humidity, windSpeed, windSpeedUnit, windDirection, pressure, visibility, pressureUnit, visibilityUnit }: Props) {
  const items: { icon: IconName; label: string; value: string }[] = [
    { icon: 'cloud', label: 'Humidity', value: `${humidity}%` },
    { icon: 'wind', label: 'Wind', value: `${windSpeed} ${windSpeedUnit} ${getWindDirectionLabel(windDirection)}` },
    { icon: 'speed', label: 'Pressure', value: formatPressure(pressure, pressureUnit) },
    { icon: 'eye', label: 'Visibility', value: formatVisibility(visibility, visibilityUnit) },
  ];
  return <View style={styles.frame}>{items.map((item) => <View key={item.label} style={styles.cell}><PixelIcon name={item.icon} size={30} color={colors.primary} /><View style={styles.copy}><Text style={styles.label}>{item.label.toUpperCase()}</Text><Text style={styles.value}>{item.value.toUpperCase()}</Text></View></View>)}</View>;
}

const styles = StyleSheet.create({
  frame: { flexDirection: 'row', flexWrap: 'wrap', borderTopWidth: 3, borderLeftWidth: 3, borderColor: colors.border, backgroundColor: colors.surface, shadowColor: colors.shadow, shadowOffset: { width: 5, height: 5 }, shadowOpacity: 1, shadowRadius: 0 },
  cell: { width: '50%', minHeight: 92, flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderRightWidth: 3, borderBottomWidth: 3, borderColor: colors.border },
  copy: { flex: 1 }, label: { fontFamily: 'monospace', fontSize: typography.size.xs, fontWeight: typography.weight.bold, letterSpacing: 1, color: colors.textSecondary },
  value: { marginTop: spacing.xs, fontFamily: 'monospace', fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.textPrimary },
});
