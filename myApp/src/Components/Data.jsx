import cielo1 from './../resources/cielo-claro.jpg';
import cielo2 from './../resources/cielo-oscuro.jpg';
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from '../context/themeContext';

export default function Data() {
    const { darkMode } = useContext(ThemeContext);
    const [cityName, setCityName] = useState('Caracas');
    const [temp, setTemp] = useState(null);
    const [desc, setDesc] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        /*const lastCity = localStorage.getItem('lastCity');
        if (lastCity) {
            setCityName(lastCity);
            search(lastCity);
        }*/
        const lastCityData = localStorage.getItem('lastCityData');
        if (lastCityData) {
            const parseData = JSON.parse(lastCityData);
            setCity(parseData.name);
            setCountry(parseData.sys.country);
            setTemp(parseData.main.temp);
            setDesc(parseData.weather[0].description);
            setCityName(parseData.name);  
        }
    }, []);

    const search = () => {
        if (cityName !== null) {
            if (cityName.trim() === '') {
                alert('Por favor, ingresa el nombre de una ciudad');
                return;
            }

            setLoading(true);

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3046aaec080540f4b8d33f376e28da64`)
            .then(response => response.json())
            .then((data) => {
                setCity(data.name);
                setCountry(data.sys.country);
                setTemp(data.main.temp);
                setDesc(data.weather[0].description);
    
                /*Guarda la última ciudad buscada
                localStorage.setItem('lastCity', data['name']);*/
                localStorage.setItem('lastCityData', JSON.stringify(data));

                setLoading(false);
            })
            .catch(() => {
                alert('Nombre de ciudad inválido, ¡inténtalo de nuevo!');
            });
        } 
    }

    /*if (!city) {
        return (<p className='flex justify-center items-center text-xl m-4'>Loading...</p>);
    }*/

    if(loading) {
        return (<p className='flex justify-center items-center text-xl m-4'>Loading...</p>);
    }

    return (
        <section className={`${darkMode ? `bg-[url(${cielo2})] text-white` : `bg-[url(${cielo1})] text-gray-900`} bg-cover h-[40vh] md:h-[50vh] flex flex-col justify-start items-center gap-3 py-8`}>
            <div className={`${darkMode ? 'bg-[#111827AA]' : 'bg-[#FFFFFFAA]'} flex flex-col justify-center items-center gap-3 w-[90%] md:w-[80%] py-5 px-3 my-auto`}>
                <h3 className='text-xl md:text-3xl font-semibold'>Discover the weather in any city in the world</h3>
                <div className='w-[80%] md:w-[60%] flex justify-center items-center shadow-xl'>
                    <input type="text" placeholder='Ingresa el nombre de la ciudad' className='bg-white text-gray-900 text-lg md:text-xl px-2 py-1 w-full rounded-l-lg outline-none' value={cityName} onChange={(e) => {setCityName(e.target.value)}} />
                    <button className='bg-blue-500 text-white text-xl px-3 py-1 rounded-r-lg' onClick={search}><i className="fa-solid fa-magnifying-glass-location"></i></button>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    {city && country && (
                        <>
                            <h3 className='text-xl md:text-3xl font-medium'>{city}, {country}</h3> 
                            <p className='text-2xl md:text-4xl'><i className="fa-solid fa-temperature-half"></i> {(temp - 273.15).toFixed(1)} ºC</p>
                            <p className='text-lg md:text-2xl'>{desc}</p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}