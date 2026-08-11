import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme';
import { getWindDirectionLabel } from '../utils/wind-direction';
import { formatVisibility, getVisibilityLabel } from '../utils/format-visibility';

import {
  formatPressure,
  getPressureLabel,
} from '../utils/pressure';

import { getHumidityLabel } from '../utils/humidity';

import { getWindSpeedLabel } from '../utils/wind-speed';

import { getWindGustLabel } from '../utils/wind-gust';

type WeatherDetailsProps = {
  humidity: number;
  windSpeed: number;
  windSpeedUnit: string;
  windGusts: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  precipitation: number;
  rain: number;
  pressureUnit: string;
  visibilityUnit: string;
  precipitationUnit: string;
};

export function WeatherDetails({
  humidity,
  windSpeed,
  windSpeedUnit,
  windGusts,
  windDirection,
  pressure,
  visibility,
  rain,
  pressureUnit,
  visibilityUnit,
  precipitationUnit,
}: WeatherDetailsProps) {
  return (
    <View style={styles.container}>

        <DetailCard
        icon="💧"
        label="Humidity"
        value={`${humidity}% · ${getHumidityLabel(humidity)}`}
        />

        <DetailCard
        icon="💨"
        label="Wind"
        value={`${windSpeed} ${windSpeedUnit}`}
        />

        <DetailCard
        icon="🌬️"
        label="Wind Gusts"
        value={`${windGusts} ${windSpeedUnit} · ${getWindGustLabel(
            windGusts,
        )}`}
        />

        <DetailCard
        icon="🧭"
        label="Wind Direction"
        value={`${Math.round(windDirection)}° ${getWindDirectionLabel(
            windDirection,
        )}`}
        />

        <DetailCard
        icon="🌡️"
        label="Pressure"
        value={`${formatPressure(
            pressure,
            pressureUnit,
        )} · ${getPressureLabel(pressure)}`}
        />

        <DetailCard
        icon="👁️"
        label="Visibility"
        value={`${formatVisibility(
            visibility,
            visibilityUnit,
        )} · ${getVisibilityLabel(
            visibility,
            visibilityUnit,
        )}`}
        />

        <DetailCard
        icon="💨"
        label="Wind"
        value={`${windSpeed} ${windSpeedUnit} · ${getWindSpeedLabel(
            windSpeed,
        )}`}
        />

        <DetailCard
        icon="☔"
        label="Rain"
        value={`${rain} ${precipitationUnit}`}
        />
      </View>
  );
}

type DetailCardProps = {
  icon: string;
  label: string;
  value: string;
};

function DetailCard({
  icon,
  label,
  value,
}: DetailCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
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

  icon: {
    marginBottom: spacing.sm,
    fontSize: 24,
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
});