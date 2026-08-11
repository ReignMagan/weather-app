import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type WeatherHeaderProps = {
  title: string;
  refreshing: boolean;
  onRefresh: () => void;
};

export function WeatherHeader({ title, refreshing, onRefresh }: WeatherHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>Weather</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Refresh weather"
          disabled={refreshing}
          onPress={onRefresh}
          style={({ pressed }) => [
            styles.refreshButton,
            pressed && !refreshing && styles.refreshButtonPressed,
            refreshing && styles.refreshButtonDisabled,
          ]}
        >
        <Text style={styles.refreshText}>{refreshing ? '…' : '↻'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },

  eyebrow: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  title: {
    marginTop: spacing.xs,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  refreshButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.surface,
  },

  refreshButtonPressed: {
    opacity: 0.65,
  },

  refreshText: {
    fontSize: 24,
    color: colors.textPrimary,
  },

  refreshButtonDisabled: {
  opacity: 0.5,
},
});
