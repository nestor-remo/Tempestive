import React, { Component, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherDetail = () => {
    const { city } = useParams();
    const [weatherData, setWeatherData] = useState([]);

    const fetchData = async (city) => {
        const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=${API_KEY}`);
        const data = await response.json();
        return data;
    }
    useEffect(() => {
        const fetchWeatherData = async () => {
            const data = await fetchData(city);
            setWeatherData(data);
        }
        fetchWeatherData().catch(console.error);
    }, [city]);

    return (
        <div>
            <h1>Weather in: </h1>
            {weatherData.data && (
                <div>
                    <h2>{weatherData.data[0].city_name}</h2>
                    <p>Temperature: {weatherData.data[0]?.temp}</p>
                    <p>Cloud Coverage: {weatherData.data[0]?.clouds}%</p>
                    <p>Wind Speed: {weatherData.data[0]?.wind_spd}</p>
                    <p>Description: {weatherData.data[0]?.weather?.description}</p>
                    <p>Precipitation: {weatherData.data[0]?.precip}</p>
                </div>
            )}
        </div>
    )
};

export default WeatherDetail;
