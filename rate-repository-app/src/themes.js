import { Platform } from "react-native";

export const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    mainBackground: "#e1e4e8",
    errorColor: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontsWeights: {
    normal: "400",
    bold: "700",
  },
};