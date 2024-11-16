import React, { Component, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherDetail = () => {
    const { city_name } = useParams();
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city_name}&key=${API_KEY}`);
            const data = await response.json();
            setWeatherData(data.data[0]);
        }
        fetchWeatherData().catch(console.error);
    }, [city_name]);

    console.log(weatherData);

    return (
        <div>
            <h1>Weather in:</h1>
            {weatherData ? (
                <div>
                    <h2>{weatherData.city_name}</h2>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Cloud Coverage: {weatherData.clouds}%</p>
                    <p>Wind Speed: {weatherData.wind_spd} m/s</p>
                </div>
            ) : (
                <p>No weather data available for {city_name}.</p>
            )}
        </div>
    )
};

export default WeatherDetail;
