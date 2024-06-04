import React, { memo } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import colors from "@utils/colors"
import { pixelFont, pixelHeight, pixelWidth } from "@utils/pixels"

interface ReactionType {
	id: string
	reactionsCount: { count: number }[]
	useridreactions: { user_id: string | undefined }[]
	reaction_category: { name: string }
	emoji: string // Assuming preprocessing adds this
}

interface ReactionProps {
	item: ReactionType
	onPress: () => void
}

interface ReactionsProps {
	items: ReactionType[]
	handleReactionPress: (itemIndex: number) => void
}

const textStyle = {
	fontSize: 20,
	fontWeight: "bold",
	color: colors.textWhite,
}

const Reaction: React.FC<ReactionProps> = memo(({ item, onPress }) => {
	let emoji = "❤️"
	// eslint-disable-next-line react/prop-types
	if (item.reaction_category?.name === "Love") {
		emoji = "❤️"
	} else if (item.reaction_category?.name === "Like") {
		emoji = "👍"
	} else if (item.reaction_category?.name === "Laugh") {
		emoji = "😂"
	} else if (item.reaction_category?.name === "Cry") {
		emoji = "😢"
	}
	return (
		<TouchableOpacity
			key={item.id}
			onPress={onPress}
			style={{
				flexDirection: "row",
				paddingHorizontal: pixelWidth(4),
				paddingVertical: pixelHeight(4),
				backgroundColor: item.useridreactions?.length > 0 ? colors.white50Alpha : colors.transparent,
				borderRadius: pixelWidth(4),
				// borderWidth: item.useridreactions?.length > 0 ? 2 : 0,
				// borderColor: colors.orange40Alpha,
			}}
		>
			<Text
				style={{
					fontWeight: "500",
					fontSize: pixelFont(12),
					color: colors.textWhite,
					marginRight: pixelWidth(2),
				}}
			>
				{emoji}
			</Text>

			<Text
				style={{
					fontWeight: "500",
					fontSize: pixelFont(12),
					color: colors.textWhite,
				}}
			>
				{item.reactionsCount[0]?.count}
			</Text>
		</TouchableOpacity>
	)
})

const Reactions: React.FC<ReactionsProps> = ({ items, handleReactionPress }) => (
	<View
		style={{
			flexDirection: "row",
			justifyContent: "space-between",
			gap: pixelWidth(4),
		}}
	>
		{items.map((item, index) => (
			<Reaction key={item.id} item={item} onPress={() => handleReactionPress(index)} />
		))}
	</View>
)

export default Reactions
