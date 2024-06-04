import React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"
import colors from "@utils/colors"

interface LoadingOverlayProps {
	loading: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading }) => {
	if (!loading) {
		return null
	}

	return (
		<View style={styles.overlay}>
			<ActivityIndicator size="large" color={colors.upvote} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 2000,
		backgroundColor: colors.black50Alpha,
	},
})

export default LoadingOverlay
