import React from 'react'
import { useState,useEffect } from 'react';
import sun from "../images/sunicon.png"
import fog from "../images/Cloud, fog, haze, mist, weather icon - Download on Iconfinder.png"
import rain from "../images/Cloud, drops, forecast, hail, heavy, rain, weather icon - Download on Iconfinder.png"
import Mist from  "../images/mist.jpg";
import rainy from "../images/rain.jpg"
import sunny from "../images/sunnynature.jpeg"
import haze from "../images/Haze.jpeg"
import clear from "../images/clear.jpeg"
const Temp = ({temp}) => {
   const [wheathermood,setwheathermood] = useState("");

useEffect(() => {

    if(temp.season){

        switch(temp.season){
        case "Rain":
       document.getElementsByClassName("map-area")[0].style.background = `url('${rainy}') no-repeat `
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 

        setwheathermood(rain);

        break;
        case "Clouds":
            setwheathermood(sun);
       document.getElementsByClassName("map-area")[0].style.background = `url('${sunny}') no-repeat`
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 


            break;
        case "Haze":
            setwheathermood(fog);
       document.getElementsByClassName("map-area")[0].style.background = `url('${haze}') no-repeat`
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 

            break;
            case "Mist":
                setwheathermood(fog);
       document.getElementsByClassName("map-area")[0].style.background = `url('${Mist}') no-repeat`
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 
       break;

       case "Fog":
                setwheathermood(fog);
       document.getElementsByClassName("map-area")[0].style.background = `url('${Mist}') no-repeat`
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 

                break;
                default:setwheathermood(sun);
                setwheathermood(sun)
       document.getElementsByClassName("map-area")[0].style.background = `url('${clear}') no-repeat`
       document.getElementsByClassName("map-area")[0].style.backgroundSize  =  "cover"; 

                break;
               
        
            
        
        }
        }

  
}, [temp])


let sec = temp.sunset;
let date = new Date(sec*1000);
let sunsettime = `${date.getHours()}: ${date.getMinutes()}`

let Realtime = new Date();
let time = "";

if(Realtime.getHours()>12){

  time += `${Realtime.getHours()-12} : ${Realtime.getMinutes()} : ${Realtime.getSeconds()} PM ` ;
   
}else{
    time += Realtime.toLocaleTimeString() + "AM"
}

  return (
    <>
      
<div className="map-area" id='wheatherbord' 
style={{
  
}}>


<div className="tempdetail">


<div className="wheathertype">
<span>{temp.temp } &deg;</span>
<p> {temp.season}

<p id="city">{temp.name}</p>
</p>

</div>
<div className="wheathericon">
  
<img src={wheathermood} alt={temp.season} />

</div>
<div className="date">
    <p>{new Date().toLocaleDateString()}</p><br />
    <p>{time}</p>

</div>
</div>
<div className="wheatherdetails">
<div className="details">

    
<i className="fa-solid fa-umbrella-beach"></i>
    
    <p>sunset</p>
    <h2>{sunsettime}</h2>
    
 </div>
<div className="details">

    
<i className="fa-solid fa-droplet "></i>

<p>Humidity</p>
<h2>{temp.humidity}</h2>
    
 </div>
<div className="details">
<i className="fa-solid fa-cloud-showers-water"></i>
    
<p>Pressure</p>
<h2>{temp.pressure}</h2>
       
    
   
    
 </div>
<div className="details">

    <i className="fa-solid fa-wind"></i>
    
<p>wind speed</p>
<h2>{temp.speed} </h2>


    
           
  
    
 </div>

</div>

</div>
    </>
  )
}

export default Temp
