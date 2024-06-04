// External imports
import { createContext } from "react"

// Internal imports
import useSubscriptionStatus from "@hooks/useSubscriptionStatus"
import { SubscriptionSchema } from "@shared/schemas"

interface SubscriptionContextType {
	subscription: null | SubscriptionSchema
	loading: boolean
	refetchSubscriptionStatus: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType>({
	subscription: null,
	loading: true,
	refetchSubscriptionStatus: async () => {},
})

const SubscriptionWrapper = ({ children }: { children: React.ReactNode }) => {
	const { subscription, loading, refetchSubscriptionStatus } = useSubscriptionStatus()

	return (
		<SubscriptionContext.Provider value={{ subscription, loading, refetchSubscriptionStatus }}>
			{children}
		</SubscriptionContext.Provider>
	)
}

export { SubscriptionContext, SubscriptionWrapper }
