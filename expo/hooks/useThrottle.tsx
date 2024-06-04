import { useRef } from "react"

const useThrottle = () => {
	const throttleSeed = useRef(null)

	// @ts-ignore
	const throttleFunction = useRef((func, delay = 200) => {
		if (!throttleSeed.current) {
			// Call the callback immediately for the first time
			func()
			// @ts-ignore
			throttleSeed.current = setTimeout(() => {
				throttleSeed.current = null
			}, delay)
		}
	})

	return throttleFunction.current
}

export default useThrottle
