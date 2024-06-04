import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native"
import { FontAwesome } from "@expo/vector-icons" // FontAwesome6の型が存在しない場合、FontAwesomeを使用
import ButtonScale from "@components/UI/ButtonScale"
import { pixelFont, pixelHeight, pixelSize, pixelWidth } from "@utils/pixels"
import colors from "@utils/colors"
import { HapticsTouch } from "@utils/haptics"

// Propsの型定義
export interface SwInputProps {
	value: string
	onChangeText: (text: string) => void
	securable?: boolean
	label: string
	placeholder: string
	autoCapitalize?: "none" | "sentences" | "words" | "characters"
	style?: ViewStyle
	onBLur?: () => void
}

const SwInput: React.FC<SwInputProps> = ({
	value,
	onChangeText,
	securable = false,
	label,
	placeholder,
	autoCapitalize = "none",
	style,
	onBLur,
}) => {
	const [showPassword, setShowPassword] = useState(securable)

	const toggleShowPassword = () => {
		HapticsTouch()
		setShowPassword(!showPassword)
	}

	return (
		<View style={style}>
			<Text style={styles.labelText}>{label}</Text>
			<View style={styles.textInputContainer}>
				<TextInput
					style={styles.textInput}
					onChangeText={onChangeText}
					value={value}
					secureTextEntry={showPassword}
					placeholder={placeholder}
					autoCapitalize={autoCapitalize}
					placeholderTextColor="#9ca3af"
					onBlur={onBLur}
				/>
				{securable && (
					<View style={styles.eyeIconButtonContainer}>
						<ButtonScale onPress={toggleShowPassword}>
							<FontAwesome name={showPassword ? "eye-slash" : "eye"} size={pixelSize(16)} color={colors.iconWhite} />
						</ButtonScale>
					</View>
				)}
			</View>
		</View>
	)
}

export default SwInput

const styles = StyleSheet.create({
	eyeIconButtonContainer: {
		height: "100%",
		justifyContent: "center",
		position: "absolute",
		right: pixelWidth(12),
	},
	labelText: {
		color: colors.textWhite,
		fontSize: pixelFont(12),
		marginTop: pixelHeight(12),
		paddingBottom: pixelHeight(8),
	},
	textInput: {
		color: colors.textWhite,
		fontSize: pixelFont(16),
		paddingHorizontal: pixelWidth(12),
		paddingVertical: pixelHeight(12),
	},
	textInputContainer: {
		borderColor: colors.textWhite,
		borderRadius: pixelSize(8),
		borderWidth: pixelSize(2),
	},
})
