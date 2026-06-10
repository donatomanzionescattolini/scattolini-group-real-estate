import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scattolini.group',
  appName: 'Scattolini Group',
  webDir: 'dist',
  backgroundColor: '#1B3433',
  server: {
    androidScheme: 'https',
  },
  ios: {
    backgroundColor: '#1B3433',
  },
  android: {
    backgroundColor: '#1B3433',
  },
};

export default config;
