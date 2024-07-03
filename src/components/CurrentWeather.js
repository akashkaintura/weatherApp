import React from 'react';
import styled, { keyframes } from 'styled-components';
import WeatherIcon from './WeatherIcon';

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const CurrentWeatherContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`;

const LocationName = styled.h2`
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #fff;
`;

const WeatherInfo = styled.p`
  font-size: 1.2em;
  margin: 5px 0;
  color: #f0f0f0;
`;

const CurrentWeather = ({ data, location }) => {
    const temperature = data.properties.temperature.value;
    const temperatureF = temperature ? (temperature * 9 / 5 + 32).toFixed(1) : 'N/A';
    const temperatureC = temperature ? temperature.toFixed(1) : 'N/A';

    return (
        <CurrentWeatherContainer>
            <LocationName>{location.city}, {location.state}</LocationName>
            <WeatherIcon iconCode={data.properties.icon} size={64} />
            <WeatherInfo>Temperature: {temperatureF}°F / {temperatureC}°C</WeatherInfo>
            <WeatherInfo>Humidity: {data.properties.relativeHumidity.value?.toFixed(1) || 'N/A'}%</WeatherInfo>
            <WeatherInfo>Wind: {data.properties.windSpeed.value?.toFixed(1) || 'N/A'} m/s</WeatherInfo>
            <WeatherInfo>Conditions: {data.properties.textDescription}</WeatherInfo>
        </CurrentWeatherContainer>
    );
};

export default CurrentWeather;