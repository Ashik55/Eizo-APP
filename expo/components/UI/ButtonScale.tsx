import React, { FC } from "react"
import TouchableScale, { TouchableScaleProps } from "react-native-touchable-scale"

const activeScale = 0.95
const friction = 16
const tension = 300

const ButtonScale: FC<TouchableScaleProps> = ({ onPress, style, children, disabled }) => (
	<TouchableScale
		style={style}
		activeScale={activeScale}
		friction={friction}
		tension={tension}
		disabled={disabled}
		onPress={onPress}
	>
		{children}
	</TouchableScale>
)
export default ButtonScale
