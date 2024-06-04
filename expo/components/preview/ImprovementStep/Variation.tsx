import { StyleSheet, View } from "react-native"
import React from "react"
import { Slider } from "@miblanchard/react-native-slider"
import colors from "@utils/colors"
import { AntDesign } from "@expo/vector-icons"

const Variation = () => {
	return (
		<View
			style={{
				paddingHorizontal: 10,
			}}
		>
			<SliderContainer caption="<Slider/> with track marks" sliderValue={[1]} trackMarks={[1, 2, 3, 4]}>
				<Slider
					minimumTrackTintColor={colors.upvote}
					trackStyle={styles.customStyles}
					renderThumbComponent={CustomThumb}
					maximumValue={4}
					minimumValue={0}
					step={1}
				/>
			</SliderContainer>
		</View>
	)
}

export default Variation

const SliderContainer = (props: {
	caption: string
	children: React.ReactElement
	sliderValue?: Array<number>
	trackMarks?: Array<number>
	vertical?: boolean
}) => {
	const { sliderValue, trackMarks } = props
	const [value, setValue] = React.useState(sliderValue ? sliderValue : DEFAULT_VALUE)
	let renderTrackMarkComponent: React.ReactNode

	if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
		renderTrackMarkComponent = (index: number) => {
			const currentMarkValue = trackMarks[index]
			const currentSliderValue = value || (Array.isArray(value) && value[0]) || 0
			const style = currentMarkValue > Math.max(currentSliderValue) ? styles.activeMark : styles.inactiveMark
			return <View style={style} />
		}
	}

	const renderChildren = () => {
		return React.Children.map(props.children, (child: React.ReactElement) => {
			if (!!child && child.type === Slider) {
				return React.cloneElement(child, {
					onValueChange: setValue,
					renderTrackMarkComponent,
					trackMarks,
					value,
				})
			}

			return child
		})
	}

	return <View style={styles.sliderContainer}>{renderChildren()}</View>
}

const CustomThumb = () => (
	<View style={styles.componentThumbStyles}>
		<AntDesign name="caretright" size={11} color="#0000007f" />
	</View>
)
const componentCustomColors = {
	gray: "#fdfdfd",
	containerBg: "grey",
	containerBorder: "purple",
}
const borderWidth = 2.5
const styles = StyleSheet.create({
	activeMark: {
		borderColor: colors.borderWhite,
		borderRadius: 10,
		borderWidth,
		left: -borderWidth / 2,
	},
	componentThumbStyles: {
		alignItems: "center",
		backgroundColor: componentCustomColors.gray,
		borderRadius: 3,
		height: 25,
		justifyContent: "center",
		width: 13,
	},
	customStyles: {
		backgroundColor: colors.secondary,
		borderRadius: 6,
		height: 14,
	},
	inactiveMark: {
		borderColor: colors.transparent,
		borderWidth,
		left: -borderWidth / 2,
	},
	sliderContainer: {
		paddingVertical: 16,
	},
})
