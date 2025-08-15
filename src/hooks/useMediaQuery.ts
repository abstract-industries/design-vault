import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    const updateMatch = () => {
      setMatches(media.matches)
    }
    
    updateMatch()
    
    if (media.addEventListener) {
      media.addEventListener("change", updateMatch)
      return () => media.removeEventListener("change", updateMatch)
    } else {
      // Fallback for older browsers
      media.addListener(updateMatch)
      return () => media.removeListener(updateMatch)
    }
  }, [query])

  return matches
}