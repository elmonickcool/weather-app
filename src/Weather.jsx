import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Stack, Button } from '@mui/material';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const API_KEY = '1b684f7ad85d9fd9395b97431ec34469';

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleString('en-US', options);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <h2>Weather Information</h2>
      <Stack>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={city}
            onChange={handleInputChange}
            placeholder="Enter city name"
          />
          <Button type="submit">Get Weather</Button>
        </form>
      </Stack>

      {weatherData && (
        <div>
          <h1>{weatherData[0].name}</h1>
          {weatherData.map((forecast) => (
            <div key={forecast.dt}>
              <p>Date and Time: {`${getFormattedDate(forecast.dt_txt)}`}</p>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Description: {forecast.weather[0].description}</p>
              {forecast.weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
