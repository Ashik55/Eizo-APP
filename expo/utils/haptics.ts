import { Platform } from "react-native"
import * as Haptics from "expo-haptics"
import { ImpactFeedbackStyle } from "expo-haptics"

export const HapticsTouch = () => {
	if (Platform.OS === "ios") Haptics.impactAsync(ImpactFeedbackStyle.Light)
}
