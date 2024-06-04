import { LinearGradient } from "expo-linear-gradient"
import colors from "@utils/colors"
import { SCREEN_WIDTH } from "@utils/pixels"
import React, { FC } from "react"

export const TopToBottomBlackGradient: FC<{ height: number }> = ({ height }) => (
	<LinearGradient
		colors={[colors.transparent, colors.black]}
		style={{
			height: height,
			width: SCREEN_WIDTH,
		}}
		start={{ x: 0, y: 1 }}
		end={{ x: 0, y: 0 }}
	/>
)
