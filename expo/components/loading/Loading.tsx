import React, { useEffect, useState } from "react"
import { Stack } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import colors from "@utils/colors"
import { StyleSheet, Text, View } from "react-native"
import LottieView from "lottie-react-native"
import { pixelFont } from "@utils/pixels"

const Loading: React.FC = () => {
	const [timeout, setTimeout] = useState(0)
	const [timeoutLimit, setTimeoutLimit] = useState(7)

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeout((prevTimeout) => {
				if (prevTimeout >= timeoutLimit) {
					setTimeoutLimit((prevLimit) => prevLimit + 5)
				}
				return prevTimeout + 0.5
			})
		}, 500)

		return () => clearInterval(interval)
	}, [timeoutLimit])

	return (
		<>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
			/>

			<View style={styles.container}>
				<LottieView
					autoPlay
					style={{
						width: 200,
						height: 200,
					}}
					// Find more Lottie files at https://lottiefiles.com/featured
					source={require("../../assets/lottie/loadinganim.json")}
				/>
				<Text style={styles.text}>Generating Image...</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: colors.black80Alpha,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: colors.textWhite,
		fontSize: pixelFont(20),
		marginTop: 20,
		fontWeight: "800",
	},
})

export default Loading
