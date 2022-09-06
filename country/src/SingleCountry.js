import { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = ({ name, countries, api_key }) => {
  const [temp, setTemp] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [icon, setIcon] = useState('');


  const findCountry = countries.find(country => country.name.common === name);
  console.log(findCountry);

  useEffect(() => {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${findCountry.capital[0]}&aqi=no`)
    .then(response => response.data)
    .then(data => {
      setTemp(data.current['temp_c'])
      setWindSpeed(data.current['wind_kph'])
      setIcon(data.current.condition['icon'])
    })
  },[]) 

  const languages = [];
  for (let key in findCountry.languages) {
    languages.push(findCountry.languages[key]);
  }

  return (
    <div>
      <h2>{findCountry.name.common}</h2>
      <p>Capital {findCountry.capital[0]}</p>
      <p>Area {findCountry.area}</p>
      <h4>Languages:</h4>
      <ul>
      {console.log(languages)}
      {languages.map((language, i) => 
         <li key={i}>{language}</li>
      )}
      </ul>
      {<img alt='flag' src={findCountry.flags['png']} />}

      <h3>Weather in {findCountry.capital[0]}</h3>
      <p>temperature {temp} Celcius</p>
      <img alt='weather icon' src={icon} />
      <p>{windSpeed} km/h</p>
    </div>
  )
}

export default SingleCountry;