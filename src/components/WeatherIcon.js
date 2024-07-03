import React from 'react';
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, WiCloud, WiCloudy, WiShowers, WiRain, WiThunderstorm, WiSnow, WiDust, WiFog } from 'react-icons/wi';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const IconWrapper = styled.div`
  display: inline-block;
  animation: ${spin} 10s linear infinite;
`;

const iconMap = {
    'skc': { day: WiDaySunny, night: WiNightClear },
    'few': { day: WiDayCloudy, night: WiNightAltCloudy },
    'sct': { day: WiCloud, night: WiCloud },
    'bkn': { day: WiCloudy, night: WiCloudy },
    'ovc': { day: WiCloudy, night: WiCloudy },
    'rain': { day: WiRain, night: WiRain },
    'rain_showers': { day: WiShowers, night: WiShowers },
    'tsra': { day: WiThunderstorm, night: WiThunderstorm },
    'snow': { day: WiSnow, night: WiSnow },
    'dust': { day: WiDust, night: WiDust },
    'fog': { day: WiFog, night: WiFog },
};

const WeatherIcon = ({ iconCode, size = 48 }) => {
    const [icon, timeOfDay] = iconCode.split('/').slice(-2);
    const IconComponent = iconMap[icon]?.[timeOfDay] || WiDaySunny;
    return (
        <IconWrapper>
            <IconComponent size={size} color="#fff" />
        </IconWrapper>
    );
};

export default WeatherIcon;