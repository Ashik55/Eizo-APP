import { createContext } from "react"
import useCredits from "@hooks/useCredits"

interface CreditsContextType {
	credits: number
}

const CreditsContext = createContext<CreditsContextType>({
	credits: 0,
})

const CreditsWrapper = ({ children }: { children: React.ReactNode }) => {
	const credits = useCredits()

	return <CreditsContext.Provider value={{ credits }}>{children}</CreditsContext.Provider>
}

export { CreditsContext, CreditsWrapper }
