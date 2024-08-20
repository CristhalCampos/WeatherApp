import logo from './../resources/logo-nubes.png';
import { useContext } from "react";
import { ThemeContext } from '../context/themeContext';

export default function NavBar() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    return (
        <nav className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} flex justify-between h-20 pl-2`}>
            <div className='flex justify-center items-center'>
                <img src={logo} alt="Logo" className='w-24' />
                <h3 className='text-xl md:text-2xl font-medium'>Weather App</h3>
            </div>
            <div className={`flex justify-center items-center border ${darkMode ? "border-white" : "border-gray-900"} rounded-xl p-2 h-8 my-auto mx-6`}>
                <button className={`${darkMode ? "flex" : "hidden"} mr-1`} onClick={toggleDarkMode}>
                {darkMode ? <i class="fa-regular fa-sun"></i> : <i class="fa-regular fa-moon"></i>}
                </button>
                <div className={`h-4 w-4 rounded-full ${darkMode ? "bg-white" : "bg-gray-900"}`}></div>
                <button className={`${darkMode ? "hidden" : "flex"} ml-1`} onClick={toggleDarkMode}>
                    {darkMode ? <i class="fa-regular fa-sun"></i> : <i class="fa-regular fa-moon"></i>}
                </button>
            </div>
        </nav>
    );
}