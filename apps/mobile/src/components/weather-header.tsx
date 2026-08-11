import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PixelIcon } from './pixel-icon';
import { colors, spacing, typography } from '../theme';

type WeatherHeaderProps = { title: string; refreshing: boolean; onRefresh: () => void };

export function WeatherHeader({ title, refreshing, onRefresh }: WeatherHeaderProps) {
  return (
    <View style={styles.shadow}>
      <View style={styles.container}>
        <PixelIcon name="mapPin" size={32} color={colors.primary} />
        <Text numberOfLines={2} style={styles.title}>{title.toUpperCase()}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Refresh weather" disabled={refreshing} onPress={onRefresh}
          style={({ pressed }) => [styles.button, pressed && styles.pressed, refreshing && styles.disabled]}>
          <PixelIcon name="reload" size={24} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: { backgroundColor: colors.shadow, paddingBottom: 5, paddingRight: 5 },
  container: { minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md, borderWidth: 3, borderColor: colors.border, backgroundColor: colors.surface },
  title: { flex: 1, fontFamily: 'monospace', fontSize: typography.size.lg, lineHeight: 25, fontWeight: typography.weight.bold, letterSpacing: 1.5, color: colors.textPrimary },
  button: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.border, backgroundColor: colors.surfaceMuted, transform: [{ translateX: -2 }, { translateY: -2 }] },
  pressed: { transform: [{ translateX: 1 }, { translateY: 1 }] },
  disabled: { opacity: 0.45 },
});
