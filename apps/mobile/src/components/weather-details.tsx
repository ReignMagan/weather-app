import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '../theme';

type WeatherDetailsProps = {
  humidity: number;
  windSpeed: number;
  windSpeedUnit: string;
};

export function WeatherDetails({
  humidity,
  windSpeed,
  windSpeedUnit,
}: WeatherDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.detail}>
        Humidity: {humidity}%
      </Text>

      <Text style={styles.detail}>
        Wind: {windSpeed} {windSpeedUnit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },

  detail: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
});