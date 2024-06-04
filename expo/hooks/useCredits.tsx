import { useState, useEffect } from "react"
import useApi from "@api/request"
import { useAuthStore } from "@store/useAuthStore"
import { supabase } from "@libs/supabase"

const useCredits = () => {
	const [credits, setCredits] = useState(0)
	const user = useAuthStore().user // Retrieve user information
	const { getCredits } = useApi() // Custom hook for API calls

	useEffect(() => {
		const channels = supabase
			.channel("credit-all-dash-channel")
			.on("postgres_changes", { event: "*", schema: "public", table: "credits" }, (payload) => {
				setCredits(payload?.new?.credits ? payload?.new?.credits : credits)
			})
			.subscribe()
		return () => {
			channels.unsubscribe()
		}
	}, [])

	useEffect(() => {
		const fetchCredits = async () => {
			if (user?.user?.id) {
				try {
					const creditData = await getCredits()
					setCredits(creditData)
				} catch (e) {
					console.log(e)
					setCredits(0) // Reset credits to 0 in case of an error
				}
			}
		}

		fetchCredits()
	}, [user?.user?.id]) // Re-run the effect every time the user's ID changes

	return credits // Return the current number of credits
}

export default useCredits
