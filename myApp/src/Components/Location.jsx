import local from './../resources/localizacion.png';
import { useContext, useState } from "react";
import { ThemeContext } from '../context/themeContext';

export default function Location() {
    const { darkMode } = useContext(ThemeContext);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [error, setError] = useState(null);
    const [temp, setTemp] = useState(null);
    const [desc, setDesc] = useState(null);
    const [addr, setAddr] = useState(null);

    const apiCall = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLong(position.coords.longitude);
                    
                    if (lat !== null && long !== null) {
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3046aaec080540f4b8d33f376e28da64`)
                        .then(response => response.json())
                        .then((data) => {
                            setTemp(data.main.temp);
                            setDesc(data.weather[0].description);
                        })
                        .catch(() => {
                            alert('Latitud y Longitud invalidas, ¡inténtalo de nuevo!');
                        });
                        
                        fetch(`https://api.distancematrix.ai/maps/api/geocode/json?latlng=${lat},${long}&key=XGxZrOYx8NSMrQjy1YuOEuJvNZyjBecTOSjwyV2xmti8NJ29vF0rGmrkP9qZI1fO`)
                        .then(response => response.json())
                        .then((data) => {
                            setAddr(data.result[0].formatted_address);
                        })
                        .catch(() => {
                            alert('¡inténtalo de nuevo!');
                        });
                    } 
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser');
        }
    }

    return (
        <section className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} grid grid-cols-[70%_30%] justify-items-center content-center`}>
            <div className='flex flex-col justify-center items-center gap-2 px-4'>
                <p className='text-center'>Get the current weather in your location with a single click</p>
                <button className='bg-blue-500 text-white px-3 py-1 rounded-lg' onClick={apiCall}>Watch now!</button>
            </div>
            <img src={local} alt="Map" />
            <div className='col-span-[100%] flex flex-col justify-center items-center'>
            {temp && desc && (
                <>
                    <h3 className='text-xl md:text-3xl font-medium text-center'>{addr}</h3>
                    <p className='text-2xl md:text-4xl'>
                        <i className="fa-solid fa-temperature-half"></i> {(temp - 273.15).toFixed(1)} ºC
                    </p>
                    <p className='text-lg md:text-2xl'>{desc}</p>
                </>
            )}
            </div>
        </section>
    );
}