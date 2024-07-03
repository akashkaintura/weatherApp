import React from 'react';
import styled, { keyframes } from 'styled-components';
import WeatherIcon from './WeatherIcon';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ForecastContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding: 10px 0;
  animation: ${fadeIn} 1s ease-out;
`;

const ForecastItem = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 15px;
  min-width: 120px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const DayName = styled.p`
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Temperature = styled.p`
  font-size: 1.2em;
  margin: 5px 0;
`;

const ShortForecast = styled.p`
  font-size: 0.9em;
  color: #f0f0f0;
`;

const Forecast = ({ data }) => {
    const dailyForecast = data.properties.periods.slice(0, 10);

    return (
        <ForecastContainer>
            {dailyForecast.map((item) => (
                <ForecastItem key={item.number}>
                    <DayName>{new Date(item.startTime).toLocaleDateString('en-US', { weekday: 'short' })}</DayName>
                    <WeatherIcon iconCode={item.icon} size={40} />
                    <Temperature>{item.temperature}°{item.temperatureUnit}</Temperature>
                    <ShortForecast>{item.shortForecast}</ShortForecast>
                </ForecastItem>
            ))}
        </ForecastContainer>
    );
};

export default Forecast;