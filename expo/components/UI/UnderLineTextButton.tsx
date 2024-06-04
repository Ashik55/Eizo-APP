import { Text, StyleSheet } from "react-native"
import ButtonScale from "@components/UI/ButtonScale"
import { pixelFont } from "@utils/pixels"
import colors from "@utils/colors"

interface UnderLineTextButtonProps {
	text: string
	onPress: () => void // onPressが引数なしで値を返さない関数である場合
}

const UnderLineTextButton: React.FC<UnderLineTextButtonProps> = ({ text, onPress }) => (
	<ButtonScale onPress={onPress} style={styles.proButton}>
		<Text style={[styles.proText]}>{text}</Text>
	</ButtonScale>
)

const styles = StyleSheet.create({
	proButton: {
		alignItems: "center",
	},
	proText: {
		color: colors.textWhite,
		fontSize: pixelFont(12),
		textDecorationLine: "underline",
		opacity: 0.8,
	},
})

export default UnderLineTextButton
