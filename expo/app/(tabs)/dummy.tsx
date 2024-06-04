import { StyleSheet } from "react-native"
import { View } from "@components/Themed"
import colors from "@utils/colors"

export default function TabThreeScreen() {
	return <View style={styles.container}></View>
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: colors.black,
		flex: 1,
		justifyContent: "center",
	},
})
