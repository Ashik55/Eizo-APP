/* eslint-disable react/jsx-filename-extension */
import { FontAwesome6 } from "@expo/vector-icons"
import { Image } from "expo-image"
import React from "react"
import { Image as RNImage, StyleSheet, TouchableOpacity, View } from "react-native"
import colors from "@utils/colors"
import { pixelSize } from "@utils/pixels"

const DEFAULT_IMAGE = require("../../assets/images/default-avatar.png")
const DEFAULT_IMAGE_URI = RNImage.resolveAssetSource(DEFAULT_IMAGE).uri

type ProfileProps = {
	image?: string | null
	onPress: () => void
}

const ProfileImage = ({
	image = "https://storage.googleapis.com/eizoai/profile_photos/391b5a46-6c04-4b0a-978f-4ce34fb97c5e.png",
	onPress,
}: ProfileProps) => {
	return (
		<TouchableOpacity style={styles.imageContainer} onPress={onPress}>
			<View style={styles.editButton}>
				<FontAwesome6 name="pen" size={10} color={colors.iconWhite} />
			</View>

			<Image
				style={styles.profileImage}
				source={{
					uri: image || DEFAULT_IMAGE_URI,
				}}
			/>
		</TouchableOpacity>
	)
}

export default ProfileImage

const styles = StyleSheet.create({
	editButton: {
		position: "absolute",
		bottom: -pixelSize(4),
		right: -pixelSize(4),
		backgroundColor: colors.upvote,
		// padding: pixelSize(8),
		zIndex: 1,
		borderRadius: pixelSize(16),
		height: pixelSize(28),
		width: pixelSize(28),
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: pixelSize(72),
		height: pixelSize(72),
		marginTop: pixelSize(20),
		borderRadius: pixelSize(36),
		backgroundColor: colors.backgroundTertiary,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.bgwhite,
		alignSelf: "center",
	},
	profileImage: {
		width: pixelSize(72),
		height: pixelSize(72),
		borderRadius: pixelSize(36),
	},
})
