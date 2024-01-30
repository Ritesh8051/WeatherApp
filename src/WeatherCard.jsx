import React from "react";

const WeatherCard = ({ item }) => {
  
  let date = item?.dt_txt.split(" ")
  // console.log(date)
  return (
      <div className="dataCard" id="current-temp" style={{ marginLeft: 10 }}>
        <div>
          <p>Date</p>
          <p>Time</p>
          <p>Temp:</p>
          <p>Feels Like:</p>
          <p>Min Temp:</p>
          <p>Max Temp:</p>
        </div>
        <div>
          <p>{date[0]}</p>
          <p>{date[1]}</p>
          <p>{Math.round(item?.main?.temp - 273.15)}°C</p>
          <p>{Math.round(item?.main?.feels_like - 273.15)}°C </p>
          <p>{Math.round(item?.main?.temp_min - 273.15)}°C</p>
          <p>{Math.round(item?.main?.temp_max - 273.15)}°C</p>
        </div>
      </div>
  );
};

export default WeatherCard;
