import { Platform } from "react-native";
import Colors from "./Colors";

const createShadowStyles = (size?: number) => {
  const shadowSize = size || 4;
  if (Platform.OS === "android") return { elevation: shadowSize };
  if (Platform.OS === "web")
    return {
      boxShadow: `${shadowSize}px ${shadowSize}px ${shadowSize / 2}px ${Colors.shadow}`,
      zIndex: 100 * shadowSize,
    };
  return {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: shadowSize / 2 },
    shadowOpacity: 0.8,
    shadowRadius: shadowSize,
  };
};

export default createShadowStyles;
