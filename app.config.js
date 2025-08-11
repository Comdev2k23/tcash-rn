import 'dotenv/config';

export default {
  expo: {
    name: "T-CASH",
    slug: "tcash-rn",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/tcash.png",
    scheme: "mobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#E8FFD7"
      },
      edgeToEdgeEnabled: true,
      package: "com.comdev2k23.casht"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#E8FFD7"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "2255577e-be48-4add-9e2a-2dfe462f3896"
      },
      clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    },
    owner: "comdev2k23"
  }
};
