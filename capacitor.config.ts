import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scattolinigroup.app',
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
