import React, {  useState } from 'react'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';


function App() {

//api key
  const apikey = '3eb3cf1e090a79d08698e2f187650f75'
  const [inputCity, setInputcity] = useState('')
  const[data, setData] = useState([]) 

//to get the weather details from api
  const getWeather = (cityName) => {
    if(!cityName) return
    const apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + apikey;
    axios.get(apiURL).then((res) => {
      console.log('response', res.data);

      setData(res.data);
    }).catch((err) => {
      console.log('error', err);
    })
  }


//to handle the input field 
  const handleInputchange = (e) => {
    setInputcity(e.target.value)
  }


  //to handle after clicking on search button
  const handleSearch = () => {
    getWeather(inputCity);
  }


  return (
    <div className="col-md-12">
      <div className="bg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-2 mt-4">
          <input
            type="text"
            className="form-control"
            placeholder="Enter city"
            onChange={handleInputchange}
            value={inputCity}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleSearch(inputCity)}
          >
            Search
          </button>

          <div className="weatherDisplay col-md-12 text-center mt-5">
            <img
              className="icon"
              src={require("./weather-icon.png")}
              alt="icon"
            />
            <h5 className="city">{data?.name}</h5>
            <h6 className="temp">{(data?.main?.temp - 273.15).toFixed()}°C</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
