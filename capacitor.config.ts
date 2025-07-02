
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6041f7a41d9b4f6fabc4ec0757940358',
  appName: 'AcadNext - College Management',
  webDir: 'dist',
  server: {
    url: 'https://6041f7a4-1d9b-4f6f-abc4-ec0757940358.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#3b82f6",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#ffffff",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      backgroundColor: "#3b82f6",
      style: "light"
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true
    }
  },
};

export default config;
