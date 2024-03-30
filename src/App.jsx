import { useEffect, useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const cities = ['anaheim', 'los angeles', 'new york'];

function App() {

  const [weatherData, setWeatherData] = useState([]);

  const fetchData = async (city) => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?&city=${city}&key=${API_KEY}`);
    const data = await response.json();
    return data;
  }


  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await Promise.all(cities.map(city => fetchData(city)));
      setWeatherData(data);
    }
    fetchWeatherData().catch(console.error);
  }, []);

  console.log(weatherData);
  return (
    <div className="App">
      {weatherData ? (
        <div>
          <h1>Weather Information</h1>
          {weatherData.map((data, index) => (
            <div key={index}>
              <h2>City: {data.data[0].city_name}</h2>
              <p>Temperature: {data.data[0].temp}°C</p>
              <p>Cloud Coverage: {data.data[0].clouds}%</p>
              <p>Description: {data.data[0].weather.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}


export default App;
