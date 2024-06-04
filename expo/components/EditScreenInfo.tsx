import React from "react"
import { StyleSheet } from "react-native"
import Colors from "@constants/Colors"
import { ExternalLink } from "./ExternalLink"
import { MonoText } from "./StyledText"
import { Text, View } from "./Themed"
import { supabase } from "@libs/supabase"
import { Link } from "expo-router"
import ButtonScale from "@components/UI/ButtonScale"
import { HapticsTouch } from "@utils/haptics"
import colors from "@utils/colors"

//TODO fix design

interface EditScreenInfoProps {
	path: string
}

const EditScreenInfo: React.FC<EditScreenInfoProps> = ({ path }) => {
	const handleLogout = async () => {
		try {
			await supabase.auth.signOut()
			HapticsTouch()
			// TODO: Navigate to login screen or update app state
		} catch (error) {
			console.error("Error logging out:", error)
			// TODO: Handle error, show error message to user
		}
	}

	return (
		<View>
			<View style={styles.getStartedContainer}>
				<Text style={styles.getStartedText}>Open up the code for this screen:</Text>

				<Link href={path} style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
					<MonoText>{path}</MonoText>
				</Link>

				<Text style={styles.getStartedText}>
					Change any of the text, save the file, and your app will automatically update.
				</Text>
			</View>
			<ButtonScale style={styles.logoutButton} onPress={handleLogout}>
				<Text style={styles.logoutButtonText}>Log Out</Text>
			</ButtonScale>
			<View style={styles.helpContainer}>
				<ExternalLink
					style={styles.helpLink}
					href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
				>
					<Text style={styles.helpLinkText}>
						Tap here if your app doesn&apos;t automatically update after making changes
					</Text>
				</ExternalLink>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	codeHighlightContainer: {
		backgroundColor: Colors.light.tint,
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedContainer: {
		alignItems: "center",
		marginHorizontal: 50,
	},
	getStartedText: {
		color: Colors.light.text,
		fontSize: 17,
		lineHeight: 24,
		textAlign: "center",
	},
	helpContainer: {
		alignItems: "center",
		marginHorizontal: 20,
		marginTop: 15,
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		color: Colors.light.tint,
		textAlign: "center",
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	logoutButton: {
		backgroundColor: colors.red,
		borderRadius: 5,
		margin: 10,
		padding: 10,
	},
	logoutButtonText: {
		color: colors.textWhite,
	},
})

export default EditScreenInfo
