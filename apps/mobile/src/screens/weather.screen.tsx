import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';


import { DailyForecast } from '../components/daily-forecast';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useWeather } from '../hooks/use-weather';

import { ErrorState } from '../components/error-state';
import { LoadingState } from '../components/loading-state';

import { HourlyForecast } from '../components/hourly-forecast';

import { WeatherDetails } from '../components/weather-details';
import { WeatherSummary } from '../components/weather-summary';

import {
  colors,
  spacing,
  typography,
} from '../theme';

export function WeatherScreen() {
  const { weather, loading, error, refresh } = useWeather();

  if (loading) {
    return <LoadingState message="Loading weather..." />;
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          void refresh();
        }}
      />
    );
  }

  if (!weather) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>No weather data available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <WeatherSummary
          location={weather.location.name || 'Current Location'}
          temperature={weather.current.temperature}
          condition={weather.current.condition}
          conditionLabel={weather.current.conditionLabel}
          apparentTemperature={weather.current.apparentTemperature}
        />

        <WeatherDetails
          humidity={weather.current.humidity}
          windSpeed={weather.current.windSpeed}
          windSpeedUnit={weather.units.windSpeed}
        />

        <HourlyForecast
          items={weather.hourly.slice(0, 12)}
        />

        <DailyForecast
          items={weather.daily}
        />

        <Button
          title="Refresh"
          onPress={() => {
            void refresh();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },

  content: {
    gap: spacing.md,
  },

  message: {
    marginTop: spacing.md,
    fontSize: typography.size.md,
    textAlign: 'center',
    color: colors.textSecondary,
  },

  error: {
    marginBottom: spacing.lg,
    fontSize: typography.size.md,
    textAlign: 'center',
    color: colors.danger,
  },
});