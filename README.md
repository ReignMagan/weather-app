# PIXEL WEATHER


**A full-stack weather app with live forecasts, offline-friendly caching, and the soul of a tiny handheld console.**

Pixel Weather combines an Expo + React Native client with a small Express API. It finds your location, turns Open-Meteo data into a shared typed forecast, and presents everything in a crisp pixel-art interface powered by [Pixelarticons](https://pixelarticons.com/).

> Built for Android, iOS, and the web. No weather API key required.

## ✨ Forecast features

- 🌤️ Current temperature, condition, apparent temperature, and local time
- 💨 Humidity, wind, pressure, visibility, rain, and precipitation details
- 🌅 Sunrise, sunset, UV index, and daily rain probability
- 🕐 Scrollable hourly forecast
- 📅 Multi-day forecast with highs, lows, and conditions
- 📍 Live foreground location with recent and last-known fallbacks
- 🗺️ Configurable default location when a device cannot provide coordinates
- 💾 Weather caching for up to 24 hours, with stale-data indicators after 30 minutes
- 🔄 Pull-to-refresh and clear retry/error states
- 🧱 Shared TypeScript contracts between client and server
- 👾 A square-edged, cobalt-and-sunshine pixel UI—absolutely no glassmorphism detected

## 🕹️ Tech Stack

| Layer     | Technology                                                     |
| --------- | -------------------------------------------------------------- |
| App       | Expo 57, React 19, React Native 0.86                           |
| Web       | React Native Web                                               |
| API       | Express 5 + TypeScript                                         |
| Weather   | [Open-Meteo](https://open-meteo.com/)                          |
| Location  | Expo Location / browser Geolocation API                        |
| Storage   | React Native Async Storage                                     |
| Icons     | [Pixelarticons](https://pixelarticons.com/) + React Native SVG |
| Tests     | Jest + React Native Testing Library                            |
| Workspace | npm workspaces                                                 |

## 🗺️ Repository map

```text
weather-app/
├── apps/
│   ├── mobile/              # Expo app for Android, iOS, and web
│   │   └── src/
│   │       ├── api/         # HTTP client and URL construction
│   │       ├── components/  # Pixel UI and forecast components
│   │       ├── hooks/       # Weather loading lifecycle
│   │       ├── screens/     # Main weather screen
│   │       ├── services/    # Location, weather, and caching
│   │       ├── theme/       # Colors, spacing, radii, typography
│   │       └── utils/       # Formatting and validation
│   └── server/              # Express API and Open-Meteo adapter
├── packages/
│   └── shared/              # Shared API and weather types
├── package.json
└── README.md
```

The data flow is intentionally small:

```text
Device location
      ↓
Expo / browser client
      ↓
GET /api/weather?latitude=...&longitude=...
      ↓
Express API → Open-Meteo
      ↓
Validated shared response → cache → pixel forecast
```

## 🚀 Insert coin

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- Expo Go, Android Studio, or Xcode for native testing
- A browser for the web build

### 1. Install the workspace

```bash
git clone <your-repository-url>
cd weather-app
npm install
```

### 2. Configure the mobile app

Copy the example environment file:

```bash
cp apps/mobile/.env.example apps/mobile/.env
```

Windows PowerShell:

```powershell
Copy-Item apps/mobile/.env.example apps/mobile/.env
```

Then update `apps/mobile/.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://YOUR_LOCAL_IP:3100/api

# Used only if live and cached device location are unavailable.
EXPO_PUBLIC_FALLBACK_LATITUDE=9.99833
EXPO_PUBLIC_FALLBACK_LONGITUDE=122.80834
```

The example fallback points to **Example City, Random Region**. Replace it with the center point of your preferred default area.

For a physical phone, `YOUR_LOCAL_IP` must be your computer's LAN address—not `localhost`. The phone and computer must be on the same network.

### 3. Start the API

```bash
npm run dev --workspace @weather-app/server
```

The API listens on port `3100` by default.

### 4. Launch the app

In a second terminal:

```bash
npm run start --workspace @weather-app/mobile
```

Or jump directly to a platform:

```bash
npm run android --workspace @weather-app/mobile
npm run ios --workspace @weather-app/mobile
npm run web --workspace @weather-app/mobile
```

## 🌐 Web location: the tiny but important rule

Browser geolocation requires HTTPS or a secure development origin. For local web development, open:

```text
http://localhost:8081
```

Avoid opening the web app through an `http://192.168.x.x:...` address—most browsers will block location on an insecure LAN origin. Also allow Location in the browser's site settings.

The web build automatically replaces the API's configured LAN hostname with the current browser hostname while preserving port `3100` and `/api`.

## 📡 API quick reference

### Health check

```http
GET /api/health
```

```json
{
  "status": "ok",
  "message": "Weather App API is healthy"
}
```

### Weather forecast

```http
GET /api/weather?latitude=9.99833&longitude=122.80834
```

Both coordinates are required and validated by the API. The response contains current, hourly, and daily weather plus units, timezone, and generation time.

Try it locally:

```bash
curl "http://localhost:3100/api/weather?latitude=9.99833&longitude=122.80834"
```

## 🧪 Quality controls

```bash
# Mobile type checking
npm run typecheck --workspace @weather-app/mobile

# Server type checking
npm run typecheck --workspace @weather-app/server

# Mobile test suite
npm test --workspace @weather-app/mobile -- --runInBand

# Repository linting and formatting
npm run lint
npm run format:check
```

The current suite covers API URL construction, client behavior, cached-weather validation, coordinate validation, stale weather, service behavior, and UI error/loading states.

## 🧭 Location fallback order

When the app requests a forecast, it tries locations in this order:

1. Live browser or native foreground location
2. A recent, reasonably accurate last-known position
3. Any available last-known position
4. `EXPO_PUBLIC_FALLBACK_LATITUDE` and `EXPO_PUBLIC_FALLBACK_LONGITUDE`

The configured fallback keeps development and emulator builds useful, but it does **not** pretend to be the user's detected position. Live device coordinates always win when available.

For an Android emulator, enable Location and set an actual coordinate from the emulator's **Extended controls → Location** panel.

## 🎨 Pixel design notes

The interface uses a deliberately limited visual vocabulary:

- Midnight-navy 3 px outlines
- Cobalt panels and stepped blue shadows
- Powder-blue sky backgrounds
- Sunshine-yellow weather accents
- Monospaced display typography
- Square controls with physical pressed states
- Official MIT-licensed Pixelarticons paths rendered through `react-native-svg`

If you add a component, keep it chunky, legible, and touch-friendly. Pixel-art flavor should never cost accessibility.

## 🛠️ Troubleshooting

### The app cannot connect to the server

- Confirm the API is running on port `3100`.
- On a physical phone, use the computer's LAN IP in `EXPO_PUBLIC_API_BASE_URL`.
- Confirm phone and computer are on the same network.
- Restart Expo after changing `.env`.

### Environment changes are not appearing

```bash
npm run start --workspace @weather-app/mobile -- --clear
```

### Android says location is enabled but returns no coordinates

An emulator needs a simulated coordinate in addition to the Location toggle. On a physical device, confirm the app has foreground location permission and that network/high-accuracy location is enabled.

### The browser blocks location

Use `http://localhost:8081`, allow location for that site, and reload the page.

## 🤝 Contributing

Bug fixes, forecast ideas, accessibility improvements, and delightfully tiny pixel details are welcome.

1. Create a branch.
2. Make the weather better.
3. Run type checks and tests.
4. Open a pull request with a clear description and screenshots for visual changes.

## 🙌 Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Pixel icon system: [Pixelarticons](https://pixelarticons.com/)
- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)

## 📜 License

This project is licensed under the ISC License.

---

```text
FORECAST SAVED. UMBRELLA OPTIONAL. ADVENTURE RECOMMENDED. ▮
```
