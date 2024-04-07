import { useEffect, useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState(['anaheim', 'los angeles', 'new york', 'las vegas', 'miami', 'san francisco', 'chicago', 'seattle', 'boston', 'dallas', 'washington dc', 'denver', 'san diego', 'phoenix', 'houston', 'philadelphia', 'minneapolis', 'portland', 'orlando', 'atlanta']);

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

  const searchItems = async (city) => {
    setSearchQuery(city);
    const data = await fetchData(city);
    setWeatherData([data]);
  };

  const filterDataByTemperature = (temperature) => {
    const filteredData = weatherData.filter((data) => data.data[0].temp >= temperature);
    setWeatherData(filteredData);
  };

  const filterDataByCloudCoverage = (cloudCoverage) => {
    const filteredData = weatherData.filter((data) => data.data[0].clouds >= cloudCoverage);
    setWeatherData(filteredData);
  }

  const clearSearch = () => {
    setSearchQuery('');
    const fetchAllWeatherData = async () => {
      const data = await Promise.all(cities.map(city => fetchData(city)));
      setWeatherData(data);
    }
    fetchAllWeatherData().catch(console.error);
  };

  return (
    <div className="App">
      <h1>Welcome to my Weather App!</h1>
      <div className='app'>

      <div className='app-child'>
          <p>Here is the weather around some popular cities:</p>
          <p>Or you can search your own:</p>
          <input
            type="text"
            placeholder="Enter a city name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => searchItems(searchQuery)}>Search</button>
          <p>You can also filter these cities by their temperature:</p>
          <input type="number" placeholder="Enter a temperature" onChange={(e) => filterDataByTemperature(e.target.value)} />
          <p> And filter by Cloud Coverage:</p>
          <input type="number" placeholder="Enter a cloud coverage" onChange={(e) => filterDataByCloudCoverage(e.target.value)} />
          <br></br>
          <br></br>
          <button onClick={clearSearch}>Clear Filters</button>
        </div>
        
        <div className='app-child2'>
          {weatherData ? (
            <div className="data">
              {weatherData.map((data, index) => (
                <div key={index}>
                  <h2>City: {data.data[0].city_name}</h2>
                  <p>Temperature: {data.data[0].temp}°C</p>
                  <p> More Details: <Link to="/detail">Click Here</Link></p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={weatherData.map((data) => ({ city: data.data[0].city_name, temperature: data.data[0].temp }))}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export default App;
