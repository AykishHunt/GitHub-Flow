import { useState, createContext, useEffect } from "react"

export const ThemeContext = createContext()
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light")
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if(savedTheme === "dark" || savedTheme === "light") {
            setTheme(savedTheme);
            document.documentElement.classList.toggle("dark", savedTheme === "dark")
        }
    }, [])

    const toggleTheme = () => {
        setTheme (prev => {
     const next = prev === "light"? "dark": "light"
            localStorage.setItem("theme", next);
            document.documentElement.classList.toggle("dark",next === "dark")
            return next
        })
    }
    return (
<ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}