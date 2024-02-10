import React from 'react'
import { useState, useEffect } from 'react'
import style from "./style.css"
import Temp from './Temp.jsx';
import LoginStatus from '../Loginfeture/LoginStatus.jsx';



const Wheather = () => {
  const [searchvalue, setsearchvalue] = useState("guwahati");
  const [temp, settemp] = useState({});
  const [weekdata,setweekdata] = useState([]);
let apiId = "76626e80d234ca2cc33cdbd7b7c1e640";

  const getwheatherinfo = async () => {



try {
  let latlongurl = `https://api.openweathermap.org/data/2.5/weather?q= ${searchvalue }&units=metric&appid=76626e80d234ca2cc33cdbd7b7c1e640`
const Data = await fetch(latlongurl)
const latlongdata = await Data.json();
const {lat ,lon} = latlongdata.coord;

      let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=76626e80d234ca2cc33cdbd7b7c1e640`
      const data = await fetch(url);
      const wheatherinfo = await data.json();
      //.log(wheatherinfo)
  
const {name,sunrise,sunset} = wheatherinfo.city
const {feels_like,humidity,pressure,temp,temp_max,temp_min} = wheatherinfo.list[0].main;
const {description:season} = wheatherinfo.list[0].weather[0];
const {speed} = wheatherinfo.list[0].wind
const weekforcast = wheatherinfo.list.slice(1,7);
const icon = wheatherinfo.list[0].weather[0]["icon"];
const {country} = wheatherinfo.city["country"]
let sec = sunset;
let date = new Date(sec*1000);
const sunsettime = `${date.getHours()-12}: ${date.getMinutes()}`



      const mywheatherdata = {
        temp,
        humidity,
        pressure,
        season,
        name,
        speed,
        country,
        sunsettime,
        sunrise,
        icon,
        speed,
        temp_max,
        temp_min
      
      }


      settemp(mywheatherdata);
      setweekdata(weekforcast)
      setsearchvalue("")
    }
    catch (err) {
      //.log(err);

    }



  }
  useEffect(() => {
    getwheatherinfo()
  }, [])

  return (
    <>
      <div className="main-container">
        <div className="inputfiled">
          <label htmlFor="input-area">
            <input type="search" name="serach" id="input-area"
              value={searchvalue}
              onChange={(e) => setsearchvalue(e.target.value)}
              placeholder="search..."
            />
            <button id="searchbtn" onClick={() => getwheatherinfo()}> search </button>
          </label>

        </div>

        <Temp temp={temp} weekdata={weekdata}/>
        <LoginStatus/>
      </div>



    </>

  )
}

export default Wheather


