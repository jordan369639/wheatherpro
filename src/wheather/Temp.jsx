import React from 'react'
import img from "../images/icon.png"
import { faDroplet, faUmbrellaBeach, faWind } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Temp = ({temp,weekdata}) => {
const date = new Date();
const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = [
  "January", "February", "March", "April", "May", "June", "July", "August","September", "October", "November", "December"
];
 
  return (
    <>
   
    <div className="weatherdetail">
      <div className="todayWheather">
        <div className="head">
            <p>{weekNames[date.getDay()]}</p>
            <p>{months[date.getMonth()]}{`${ date.getDate()}`}</p>

        </div>
        <div className="tempdetail">
            <p id='cityname'>{temp.name}</p>
            <p id='degree'>{Math.floor(temp.temp - 273.13)}&deg;</p>
            <p id='lowesstTemp'>L <span className='tempminmax'>{Math.floor(temp.temp_min-273.13)} &deg;</span></p>
            <p id='heighstTemp'>H <span className='tempminmax'>{Math.ceil(temp.temp_min-273.13)} &deg;</span></p>
        </div>
        <div className="tempIcons">
        <img src={`https://openweathermap.org/img/wn/${temp.icon}.png`} alt="" />
            <h3>{temp.season}</h3>
            <p><span className='icons'><FontAwesomeIcon icon={faDroplet} /></span>{temp.pressure}</p>
            <p><span className='icons'><FontAwesomeIcon icon={faWind} size='1x'/></span>{temp.speed + " km/h"}</p>
            <p><span className='icons'><FontAwesomeIcon icon={faUmbrellaBeach} /></span>{temp.sunsettime +"pm"}</p>
        </div>
      </div>
     {
      weekdata.map((elem,i)=>{
       
        return(
          <>
          <div className="weekWheather" key={date.getMilliseconds()}>
      <div className="head">
    
      <p>{weekNames[(date.getDay()+i+1)%7]}</p>
     
        </div>
        <div className="wheathericon">
        { elem.weather[0].description == 'clear sky'? (
       <img src={img} alt="" className='weekImg'/>
      ) : (
        <img src={`https://openweathermap.org/img/wn/${elem.weather[0]["icon"]}.png`} alt="" className='weekImg'/>
      )}
       

         <p>{elem.weather[0].description}</p>
        <div className="degree">
        <p className='weektemp'>{Math.floor(elem.main.temp - 273.13)}&deg;C</p>
            <p className='Lwsttemp'> <span >{Math.floor(elem.main.temp_min-274.13)} &deg;C</span></p>
        </div>
        </div>
      
      </div>
          </>
        )
      })
     }
    




    </div>
    
    
    
    </>
  )
}

export default Temp