import local from './../resources/localizacion.png';
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../context/themeContext';

export default function Location() {
    const { darkMode } = useContext(ThemeContext);
    return (
        <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} flex justify-around items-center`}>
            <div>
                <p>Get the current weather in your location with a single click</p>
                <button className='bg-blue-500 text-white'>Watch now!</button>
            </div>
            <img src={local} alt="Map" className='w-[30%]' />
        </section>
    );
}