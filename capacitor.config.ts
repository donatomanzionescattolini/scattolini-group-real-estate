import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scattolini.group',
  appName: 'Scattolini Group',
  webDir: 'dist',
  backgroundColor: '#0E2D2F',
  server: {
    androidScheme: 'https',
  },
  ios: {
    backgroundColor: '#0E2D2F',
  },
  android: {
    backgroundColor: '#0E2D2F',
  },
};

export default config;
