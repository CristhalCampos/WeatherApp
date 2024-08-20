import logo from './../resources/Logo-nubes.png'
import { useContext } from "react";
import { ThemeContext } from '../context/themeContext'

export default function NavBar() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    return (
        <nav className={`${darkMode ? "bg-black" : "bg-white"} ${darkMode ? "text-white" : "text-black"} flex justify-between h-20 pl-2`}>
            <div className='flex justify-center items-center'>
                <img src={logo} alt="Logo" className='w-24' />
                <p>Weather App</p>
            </div>
            <div className={`flex justify-center items-center border ${darkMode ? "border-white" : "border-black"} rounded-xl p-2 h-8 my-auto mx-6`}>
                <button className={`${darkMode ? "flex" : "hidden"} mr-1`} onClick={toggleDarkMode}>
                {darkMode ? <i class="fa-regular fa-sun"></i> : <i class="fa-regular fa-moon"></i>}
                </button>
                <div className={`h-4 w-4 rounded-full ${darkMode ? "bg-white" : "bg-black"}`}></div>
                <button className={`${darkMode ? "hidden" : "flex"} ml-1`} onClick={toggleDarkMode}>
                    {darkMode ? <i class="fa-regular fa-sun"></i> : <i class="fa-regular fa-moon"></i>}
                </button>
            </div>
        </nav>
    )
}