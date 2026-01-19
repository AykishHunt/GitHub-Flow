import {useContext} from 'react'
import {ThemeContext} from "../Context/ThemeContext"

export const ThemeToggle = () => {
   const {theme, toggleTheme} =useContext(ThemeContext)

  return (
    <div>
  <button onClick={toggleTheme} className='w-full pb-2 rounded flex justify-end hover:gray-600 text-white'>
            {theme === "light"? "🌙": "🔆"} 
            
        </button>
    </div>
  )
}
