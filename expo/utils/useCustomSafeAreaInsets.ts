import { useSafeAreaInsets } from "react-native-safe-area-context"

const useCustomSafeAreaInsets = () => {
	const insets = useSafeAreaInsets()

	return insets
}

export default useCustomSafeAreaInsets
