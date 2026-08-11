import { StyleSheet, Text, View } from 'react-native';
import { PixelIcon } from './pixel-icon';
import { colors, spacing, typography } from '../theme';

type Props = {
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
  timezone: string;
};
type IconName = 'cloud' | 'cloudSun' | 'moon';

export function TodayHighlights({
  sunrise,
  sunset,
  uvIndexMax,
  precipitationProbabilityMax,
  timezone,
}: Props) {
  const items: { icon: IconName; label: string; value: string }[] = [
    { icon: 'cloudSun', label: 'Sunrise', value: formatTime(sunrise, timezone) },
    { icon: 'moon', label: 'Sunset', value: formatTime(sunset, timezone) },
    { icon: 'cloudSun', label: 'UV index', value: uvIndexMax.toFixed(1) },
    { icon: 'cloud', label: 'Precip.', value: `${precipitationProbabilityMax}%` },
  ];
  return (
    <View style={styles.frame}>
      {items.map((item) => (
        <View key={item.label} style={styles.item}>
          <PixelIcon
            name={item.icon}
            size={28}
            color={item.label === 'UV index' ? colors.sunshine : colors.primary}
          />
          <Text style={styles.label}>{item.label.toUpperCase()}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
function formatTime(value: string, timezone: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
}
const styles = StyleSheet.create({
  frame: {
    flexDirection: 'row',
    borderWidth: 3,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  item: {
    flex: 1,
    minHeight: 96,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRightWidth: 2,
    borderRightColor: colors.border,
  },
  label: {
    marginTop: spacing.xs,
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: typography.weight.bold,
    color: colors.textSecondary,
  },
  value: {
    marginTop: 2,
    fontFamily: 'monospace',
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },
});
