import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';

import { LastUpdated } from '../components/last-updated';

import { RefreshErrorBanner } from '../components/refresh-error-banner';

import { Section } from '../components/section';
import { WeatherHeader } from '../components/weather-header';

import { TodayHighlights } from '../components/today-highlights';

import { DailyForecast } from '../components/daily-forecast';

import { SafeAreaView } from 'react-native-safe-area-context';

import { useWeather } from '../hooks/use-weather';

import { ErrorState } from '../components/error-state';
import { LoadingState } from '../components/loading-state';

import { HourlyForecast } from '../components/hourly-forecast';

import { WeatherDetails } from '../components/weather-details';
import { WeatherSummary } from '../components/weather-summary';

import { colors, spacing, typography } from '../theme';

import { formatLocationName } from '../utils/format-location';

import { StaleWeatherBanner } from '../components/stale-weather-banner';
import { isWeatherStale } from '../utils/weather-staleness';

export function WeatherScreen() {
  const { weather, locationName, loading, error, usingCachedWeather, refresh } = useWeather();

  if (loading && !weather) {
    return <LoadingState message="Loading weather..." />;
  }

  if (error && !weather) {
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

  const locationLabel = formatLocationName(locationName);
  const weatherIsStale = usingCachedWeather || isWeatherStale(weather.generatedAt);
  const today = weather.daily[0];

  const currentHourIndex = weather.hourly.findIndex((item) => item.time >= weather.current.time);

  const upcomingHourly =
    currentHourIndex >= 0
      ? weather.hourly.slice(currentHourIndex, currentHourIndex + 12)
      : weather.hourly.slice(0, 12);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              void refresh();
            }}
            tintColor={colors.primary}
          />
        }
      >
        <WeatherHeader
          title={locationLabel}
          refreshing={loading}
          onRefresh={() => {
            void refresh();
          }}
        />

        <LastUpdated generatedAt={weather.generatedAt} />

        {weatherIsStale && <StaleWeatherBanner />}

        {error && (
          <RefreshErrorBanner
            message={error}
            onRetry={() => {
              void refresh();
            }}
          />
        )}

        <WeatherSummary
          location={locationLabel}
          temperature={weather.current.temperature}
          temperatureUnit={weather.units.temperature}
          condition={weather.current.condition}
          conditionLabel={weather.current.conditionLabel}
          apparentTemperature={weather.current.apparentTemperature}
          isDay={weather.current.isDay}
          currentTime={weather.current.time}
          timezone={weather.timezone}
        />

        <Section title="Current Details">
          <WeatherDetails
            humidity={weather.current.humidity}
            windSpeed={weather.current.windSpeed}
            windSpeedUnit={weather.units.windSpeed}
            windGusts={weather.current.windGusts}
            windDirection={weather.current.windDirection}
            pressure={weather.current.pressure}
            visibility={weather.current.visibility}
            precipitation={weather.current.precipitation}
            rain={weather.current.rain}
            pressureUnit={weather.units.pressure}
            visibilityUnit={weather.units.visibility}
            precipitationUnit={weather.units.precipitation}
          />
        </Section>

        {today && (
          <Section title="Today">
            <TodayHighlights
              sunrise={today.sunrise}
              sunset={today.sunset}
              uvIndexMax={today.uvIndexMax}
              precipitationProbabilityMax={today.precipitationProbabilityMax}
              precipitationSum={today.precipitationSum}
              precipitationUnit={weather.units.precipitation}
              timezone={weather.timezone}
            />
          </Section>
        )}

        <Section title="Hourly Forecast">
          <HourlyForecast
            items={upcomingHourly}
            temperatureUnit={weather.units.temperature}
            timezone={weather.timezone}
          />
        </Section>

        <Section title="Daily Forecast">
          <DailyForecast
            items={weather.daily}
            temperatureUnit={weather.units.temperature}
            timezone={weather.timezone}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },

  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.xl,
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
