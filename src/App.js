import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [mausamDetails, setMausamDetails] = useState([]);
  const [city, setCity] = useState("kota");
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState("");
  const [windspeed, setWineSpeed] = useState("");
  const [wicon, setWicon] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=a094f3f7912c5c665ca09e6b0f6fbb35`
      )
        .then((res) => res.json())
        .then((result) => {
          setMausamDetails(result);
          setTemperature(Math.round(result.main.temp));
          setDesc(result.weather[0].description);
          setName(result.name);
          setHumidity(result.main.humidity);
          setVisibility(result.visibility / 1000);
          setWineSpeed(result.wind.speed);
          setWicon(result.weather[0].icon);
          setCity("");
        });
    };
    fetchData();
  }, [lat, long]);

  const cityTemp = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=a094f3f7912c5c665ca09e6b0f6fbb35`
    )
      .then((res) => res.json())
      .then((result) => {
        setMausamDetails(result);
        setTemperature(Math.round(result.main.temp));
        setDesc(result.weather[0].description);
        setName(result.name);
        setHumidity(result.main.humidity);
        setVisibility(result.visibility / 1000);
        setWineSpeed(result.wind.speed);
        setWicon(result.weather[0].icon);
        setCity("");
      });
  };

  return (
    <div className="background">
      <div className="container">
        <div className="city">
          <form action="" className="form">
            <input
              type="text"
              name="input"
              value={city}
              className="Search-box"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="searchbtn"
              onClick={(e) => {
                e.preventDefault();
                cityTemp();
              }}
            >
              Search
            </button>
          </form>
        </div>
        <div id="card" className="weather">
          <div className="details">
            <div className="temp">
              {temperature}
              <span>&deg;</span>
            </div>
            <div className="right">
              <div id="summary">{desc}</div>
              <div style={{ fontWeight: "bold", marginTop: "4px" }}>{name}</div>
            </div>
          </div>
          <img className="weatherimg" alt="image1" src={`${wicon}.svg`} />
          <div className="infos">
            <img
              alt="humidity1"
              className="humidityimg"
              style={{ width: "5", height: "5" }}
              src="humidity.svg"
            ></img>
            <div className="humidity">Humidity {humidity}%</div>
            <img
              alt="visibility1"
              className="visibilityimg"
              style={{ width: "5", height: "5" }}
              src="visibility.svg"
            ></img>
            <div className="visibility">Visibility {visibility} km</div>
            <img
              alt="windspeed1"
              className="windimg"
              style={{ width: "5", height: "5" }}
              src="wind.svg"
            ></img>
            <div className="windspeed">Wind Speed {windspeed} km</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
