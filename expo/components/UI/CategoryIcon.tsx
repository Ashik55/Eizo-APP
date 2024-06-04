import { FontAwesome6 } from "@expo/vector-icons"
import React from "react"

interface CategoryIconProps {
	color: string
	categoryId: string
	size?: number
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ color, categoryId, size = 20 }) => {
	switch (categoryId) {
		case "style":
			return <FontAwesome6 name="paintbrush" size={size} color={color} />
		case "emotion":
			return <FontAwesome6 name="smile-wink" size={size} color={color} />
		case "pose":
			return <FontAwesome6 name="person" size={size} color={color} />
		case "framing":
			return <FontAwesome6 name="crop-simple" size={size} color={color} />
		case "character":
			return <FontAwesome6 name="user-ninja" size={size} color={color} />
		case "tool":
			return <FontAwesome6 name="toolbox" size={size} color={color} />
		case "theme":
			return <FontAwesome6 name="robot" size={size} color={color} />
		case "clothe":
			return <FontAwesome6 name="shirt" size={size} color={color} />
		case "view":
			return <FontAwesome6 name="camera" size={size} color={color} />
		default:
			return null
	}
}

export default CategoryIcon
