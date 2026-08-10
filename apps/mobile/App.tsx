import { StatusBar } from 'expo-status-bar';

import { WeatherScreen } from './src/screens/weather.screen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <WeatherScreen />
    </>
  );
}