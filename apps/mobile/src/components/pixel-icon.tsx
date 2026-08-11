import Svg, { Path } from 'react-native-svg';

type PixelIconName =
  | 'alert'
  | 'chevronRight'
  | 'clock'
  | 'cloud'
  | 'cloudSun'
  | 'eye'
  | 'mapPin'
  | 'moon'
  | 'reload'
  | 'speed'
  | 'thermometer'
  | 'wind';

type PixelIconProps = {
  name: PixelIconName;
  size?: number;
  color?: string;
};

// Paths are sourced from the MIT-licensed Pixelarticons package.
const paths: Record<PixelIconName, string[]> = {
  alert: ['M4 2h16v2H4zm0 18h16v2H4zM20 4h2v16h-2zM2 4h2v16H2zm9 2h2v8h-2zm0 10h2v2h-2z'],
  chevronRight: ['M16 13v-2h-2v2h2Zm-2-2V9h-2v2h2Zm0 4v-2h-2v2h2Zm-2-6V7h-2v2h2Zm0 8v-2h-2v2h2ZM10 7V5H8v2h2Zm0 12v-2H8v2h2Z'],
  clock: ['M6 2h12v2H6zM2 6h2v12H2zm18 0h2v12h-2zm-2-2h2v2h-2zM4 4h2v2H4zm2 18h12v-2H6zm12-2h2v-2h-2zM4 20h2v-2H4zm7-14h2v7h-2zm2 7h2v2h-2zm2 2h2v2h-2z'],
  cloud: ['M22 10h-4v2h4v-2Zm2 2h-2v6h2v-6Zm-2 6H2v2h20v-2ZM2 12H0v6h2v-6Zm2-2H2v2h2v-2Zm4-2H4v2h4V8Zm8-4h-6v2h6V4Zm-6 2H8v2h2V6Zm0 4H8v2h2v-2Zm8-4h-2v2h2V6ZM20 8h-2v4h2V8Zm-2 4h-2v2h2v-2Z'],
  cloudSun: ['M14 22H4v-2h10v2ZM4 20H2v-4h2v4Zm12 0h-2v-4h2v4Zm-6-2H8v-2h2v2Zm-2-2H4v-2h4v2Zm6 0h-2v-2h2v2Zm-2-2H8v-2h4v2Zm12-1h-4v-2h4v2Zm-6-1h-2v-2h2v2ZM8 10H6V8h2v2Zm8 0h-2V8h2v2Zm-2-2H8V6h6v2ZM6 6H4V4h2v2Zm14 0h-2V4h2v2ZM4 4H2V2h2v2Zm9 0h-2V0h2v4Zm9 0h-2V2h2v2Z'],
  eye: ['M16 20H8v-2h8v2Zm-8-2H4v-2h4v2Zm12 0h-4v-2h4v2ZM4 16H2v-2h2v2Zm10-6h-2v2h2v-2h2v4h-2v2h-4v-2H8v-4h2V8h4v2Zm8 6h-2v-2h2v2ZM2 14H0v-4h2v4Zm22 0h-2v-4h2v4ZM4 10H2V8h2v2Zm18 0h-2V8h2v2ZM8 8H4V6h4v2Zm12 0h-4V6h4v2Zm-4-2H8V4h8v2Z'],
  mapPin: ['M7 2h10v2H7zM5 4h2v2H5zm14 0h-2v2h2zM7 17h2v2H7zm2 2h2v2H9zm6-2h2v2h-2zm-2 2h2v2h-2zm-2 2h2v2h-2zm-6-7h2v3H5zm12 0h2v3h-2zM3 6h2v8H3zm18 0h-2v8h2zM10 6h4v2h-4zM8 8h2v4H8zm2 4h4v2h-4zm4-4h2v4h-2z'],
  moon: ['M18 22H8v-2h10v2ZM8 20H6v-2h2v2Zm12 0h-2v-2h2v2ZM6 18H4v-2h2v2Zm16 0h-2v-4h-2v-2h2v-2h2v8ZM4 16H2V6h2v10Zm14 0h-6v-2h6v2Zm-6-2h-2v-2h2v2Zm-2-2H8V6h2v6ZM6 6H4V4h2v2Zm8-2h-2v2h-2V4H6V2h8v2Z'],
  reload: ['M16 4h2v6h-2zm-2-2h2v2h-2zm0 2h2v8h-2zM4 8H2v5h2z', 'M4 6h16v2H4zm4 14H6v-6h2zm2 2H8v-2h2zm0-2H8v-8h2zm10-4h2v-5h-2z', 'M20 18H4v-2h16z'],
  speed: ['M5 19H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 17H1v-6h2v6Zm11 0h-4v-4h1V5h2v8h1v4Zm9 0h-2v-6h2v6ZM5 11H3V9h2v2Zm16 0h-2V9h2v2ZM9 9H5V7h4v2Zm10 0h-4V7h4v2Z'],
  thermometer: ['M9 2h6v2H9zm0 18h6v2H9zm2-4h2v2h-2zM7 4h2v16H7zm8 0h2v16h-2zM5 16h4v2H5zM5 6h4v2H5zm0 5h4v2H5z'],
  wind: ['M2 7h10v2H2zm10-4h2v4h-2zM7 1h5v2H7zM2 11h18v2H2zm18-4h2v4h-2zm-4-2h4v2h-4zM2 17h12v-2H2zm12 2h2v-2h-2zm-5 2h5v-2H9z'],
};

export function PixelIcon({ name, size = 24, color = '#0A1B44' }: PixelIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden>
      {paths[name].map((path, index) => <Path key={`${name}-${index}`} d={path} fill={color} />)}
    </Svg>
  );
}
