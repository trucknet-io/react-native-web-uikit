import { Platform } from "react-native";
import Colors from "./Colors";

const getShadowStyle = (size?: number) => {
  const shadowSize = size || 4;
  const zIndex = shadowSize * 100;
  if (Platform.OS === "android") return { elevation: shadowSize, zIndex };
  if (Platform.OS === "web")
    return {
      boxShadow: `${shadowSize}px ${shadowSize}px ${shadowSize / 2}px ${Colors.shadow}`,
      zIndex,
    };
  return {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: shadowSize / 2 },
    shadowOpacity: 0.8,
    shadowRadius: shadowSize,
    zIndex,
  };
};

export default getShadowStyle;
