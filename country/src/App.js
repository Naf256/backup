import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState('');
  const api_key = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      //console.log(response.data)
      setCountries(response.data)
    })
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=London&aqi=no`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  },[])

  const handleShow = (name) => {
    setShow(name);
  }

  const handleChange = (event) => {
    setFilter(event.target.value);
    setShow('');
  }
  console.log("we are inside")
  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
      <Country api_key={api_key} show={show} filter={filter} countries={countries} handleShow={handleShow} />
    </div>
  );
}

export default App;
