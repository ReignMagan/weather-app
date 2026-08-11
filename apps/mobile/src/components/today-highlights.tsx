import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import { getUvIndexLabel } from '../utils/uv-index';
import { getPrecipitationLabel } from '../utils/precipitation';

import { getRainChanceLabel } from '../utils/rain-chance';

type TodayHighlightsProps = {
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationProbabilityMax: number;
  precipitationSum: number;
  precipitationUnit: string;
  timezone: string;
};

function formatTime(value: string, timezone: string) {
  const date = new Date(value);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
}

export function TodayHighlights({
  sunrise,
  sunset,
  uvIndexMax,
  precipitationProbabilityMax,
  precipitationSum,
  precipitationUnit,
  timezone,
}: TodayHighlightsProps) {
  return (
    <View style={styles.container}>
      
      <View style={styles.grid}>
        <HighlightCard
            icon="🌅"
            label="Sunrise"
            value={formatTime(sunrise, timezone)}
            />

            <HighlightCard
            icon="🌇"
            label="Sunset"
            value={formatTime(sunset, timezone)}
            />

            <HighlightCard
            icon="☀️"
            label="UV Index"
            value={`${uvIndexMax.toFixed(1)} · ${getUvIndexLabel(uvIndexMax)}`}
            />

            <HighlightCard
            icon="🌧️"
            label="Rain Chance"
            value={`${precipitationProbabilityMax}% · ${getRainChanceLabel(
                precipitationProbabilityMax,
            )}`}
            />

            <HighlightCard
            icon="💧"
            label="Precipitation"
            value={`${precipitationSum} ${precipitationUnit} · ${getPrecipitationLabel(
                precipitationSum,
            )}`}
            />
      </View>
    </View>
  );
}

type HighlightCardProps = {
  icon: string;
  label: string;
  value: string;
};

function HighlightCard({
  icon,
  label,
  value,
}: HighlightCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },

  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },

  card: {
    width: '47%',
    minHeight: 88,
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },

  label: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },

  value: {
    marginTop: spacing.xs,
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
    color: colors.textPrimary,
  },

  icon: {
  marginBottom: spacing.sm,
  fontSize: 24,
},
});