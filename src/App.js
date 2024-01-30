import React, { useEffect, useState } from "react";
import "./index.css";
import Loader from "./Loader";
import locationLogo from "./geo-alt.svg";
import weatherLogo from "./1779862.png";
import WeatherCard from "./WeatherCard";

const App = () => {
  const api_key = "75257040b86479b3304999538b8744fb";
  const [inputSearch, setInputSearch] = useState("gaya");
  const [loading, setLoading] = useState(false);
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [wethData, setWethData] = useState();
  const [hourWetData, setHourWetData] = useState();

  useEffect(() => {
    fetchData();
    fiveDayData();
  }, []);

  useEffect(() => {
    fetchTime();
  });

  const fetchTime = () => {
    const time = new Date();
    setHour(time.getHours());
    setMin(time.getMinutes());
    setMonth(time.getMonth());
    setDay(time.getDay());
    setDate(time.getDate());
  };

  const fetchData = async () => {
    setLoading(true);
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${api_key}`
    );

    data = await data.json();
    setWethData(data);
    data = await JSON.stringify(data?.coord)
    localStorage.setItem('data', data)
    fiveDayData();
  };

  const sec = (data) => {
    if (data < 10) {
      return `0${data}`;
    }

    return data;
  };

  const fiveDayData = async () => {

    let coord = localStorage.getItem('data')
    console.log(coord)
    coord = await JSON.parse(coord)
    console.log(coord)

      let data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord?.lat}&lon=${coord?.lon}&appid=${api_key}`
      );

      // console.log(data)

      data = await data.json();

      setHourWetData(data?.list);

      setLoading(false);
    
  };

  const searchHandler = async () => {
    fetchData();
    setInputSearch("");
    // fiveDayData();
  };
  return (
    <>
      {loading ? (
        <div className="loading-cont">
          <Loader />
        </div>
      ) : (
        <>
          <div className="container">
            <div className="current-info">
              <div className="date-container">
                <div className="time" id="time">
                  {hour}:{min ? sec(min) : min}
                </div>
                <div className="date" id="date">
                  {Date} {Date().split(" ")[0]},{Date} {Date().split(" ")[2]}{" "}
                  {Date} {Date().split(" ")[1]}
                </div>
                <div className="others" id="current-weather-items">
                  <div className="weather-item curernt-location">
                    <div>{wethData?.name}</div>
                  </div>
                  <div className="weather-item">
                    <div>Humidity</div>
                    <div>{wethData?.main?.humidity}%</div>
                  </div>
                  <div className="weather-item">
                    <div>pressure</div>
                    <div>{wethData?.main?.pressure}Hg</div>
                  </div>
                  <div className="weather-item">
                    <div>Speed</div>
                    <div>{wethData?.wind?.speed}Kmph</div>
                  </div>
                </div>
              </div>
              <div className="place-container">
                <div>
                  <input
                    type="text"
                    placeholder="search your city "
                    id="search-input"
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 search-icon"
                    id="searchHandler"
                    onClick={searchHandler}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{ width: "20px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <div style={{ display: "flex", marginLeft: "20px" }}>
                    <p>{wethData?.name}</p>
                    <p style={{ marginLeft: "5px" }}>
                      {Math.round(wethData?.main?.temp - 273.15)}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-card">
            {hourWetData?.slice(0, 5).map((item, index) => (
              <WeatherCard key={index} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default App;
