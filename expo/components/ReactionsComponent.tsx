import React from "react"
import { View } from "react-native"

interface ReactionCategory {
	name: "Love" | "Like" | "Laugh" | "Cry"
}

interface Reaction {
	reaction_category?: ReactionCategory
	useridreactions: string // Assuming useridreactions is a string, adjust as needed
	reactionsCount: {
		count: number
	}[] // Assuming this structure based on the original code
}

interface ReactionButtonProps {
	useridreactions: string
	onPress: () => void
	emoji: string
	count: number
}

// Define your ReactionButton component if not already defined
const ReactionButton: React.FC<ReactionButtonProps> = ({ useridreactions, onPress, emoji, count }) => {
	// Implementation of your ReactionButton
	return null // Placeholder return
}

interface ReactionsComponentProps {
	reactions: Reaction[]
	handleReactionPress: (index: number) => void
}

const ReactionsComponent: React.FC<ReactionsComponentProps> = ({ reactions, handleReactionPress }) => {
	return (
		<View
			style={{
				flexDirection: "row",
				// Adjust spacing using margin in the ReactionButton component as 'gap' is not supported in React Native
			}}
		>
			{reactions?.map((reaction, index) => {
				let emoji = "❤️" // Default emoji
				switch (reaction.reaction_category?.name) {
					case "Love":
						emoji = "❤️"
						break
					case "Like":
						emoji = "👍"
						break
					case "Laugh":
						emoji = "😂"
						break
					case "Cry":
						emoji = "😢"
						break
					default:
						// Default case is already set above
						break
				}
				return (
					<ReactionButton
						key={index} // Assuming each reaction is unique per index, otherwise use a unique id
						useridreactions={reaction.useridreactions}
						onPress={() => handleReactionPress(index)}
						emoji={emoji}
						count={reaction.reactionsCount[0]?.count || 0} // Ensure count is defined
					/>
				)
			})}
		</View>
	)
}

export default ReactionsComponent
