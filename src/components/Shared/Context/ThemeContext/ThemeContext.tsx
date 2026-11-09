import { createContext, useEffect, useState, type ReactNode, type SetStateAction } from "react"

type currentThemeType = 'light' | 'dark'


type ThemeContextType = {
   currentTheme: currentThemeType ,
   setCurrentTheme: React.Dispatch<SetStateAction<currentThemeType>>
}
type ThemeProviderProps = {
    children: ReactNode
}
export const ThemeContext = createContext<ThemeContextType | null>(null) 

export function ThemeProvider ({children}: ThemeProviderProps) {

const[currentTheme , setCurrentTheme] = useState<currentThemeType>(() => {
    const saved = localStorage.getItem("theme")
     return saved === 'dark' ? 'dark' : 'light'
})

useEffect(() => {
localStorage.setItem("theme" , currentTheme)
} , [currentTheme])

    return (
<ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
        {children}
</ThemeContext.Provider>    
    )
}