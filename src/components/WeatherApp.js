import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
  animation:  1s ease-out;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 }); // Default to New York City

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                // Fetch the grid coordinates
                const pointsResponse = await fetch(`https://api.weather.gov/points/${coordinates.lat},${coordinates.lon}`);
                const pointsData = await pointsResponse.json();

                // Fetch the forecast
                const forecastResponse = await fetch(pointsData.properties.forecast);
                const forecastData = await forecastResponse.json();

                // Fetch the current conditions
                const stationsResponse = await fetch(pointsData.properties.observationStations);
                const stationsData = await stationsResponse.json();
                const stationId = stationsData.features[0].id;
                const currentResponse = await fetch(`${stationId}/observations/latest`);
                const currentData = await currentResponse.json();

                setWeatherData({
                    current: currentData,
                    forecast: forecastData,
                    location: pointsData.properties.relativeLocation.properties
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
    }, [coordinates]);

    const handleLocationSubmit = async (e) => {
        e.preventDefault();
        try {
            const geocodingResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=us`);
            const geocodingData = await geocodingResponse.json();
            if (geocodingData.length > 0) {
                setCoordinates({ lat: geocodingData[0].lat, lon: geocodingData[0].lon });
            } else {
                alert('Location not found. Please try again.');
            }
        } catch (error) {
            console.error('Error geocoding location:', error);
        }
    };

    return (
        <AppContainer>
            <h1>Weather App</h1>
            <form onSubmit={handleLocationSubmit}>
                <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter a US location (e.g., New York, NY)"
                />
            </form>
            {weatherData && (
                <>
                    <CurrentWeather data={weatherData.current} location={weatherData.location} />
                    <Forecast data={weatherData.forecast} />
                </>
            )}
        </AppContainer>
    );
};

export default WeatherApp;