import SingleCountry from "./SingleCountry";

const Country = ({ filter, countries, handleShow, show, api_key }) => {
  console.log('Hola amigos -', countries)
  const showThem = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()))

  if (showThem.length === 1) {
    return (
      <SingleCountry
        name={showThem[0].name.common}
        countries={countries}
        api_key={api_key}
      />
    )
  }
  else if (showThem.length <= 10) {
    if (show) {
      return (
        <SingleCountry
          name={show}
          countries={countries}
          api_key={api_key}
        />
      )
    }
    return (
      <div>
        {showThem.map((country, i) =>  
            <p key={i}>{country.name.common} 
            <button onClick={() => handleShow(country.name.common)}>show</button>
            </p> 
        )}
      </div>
    )
  } else {
    return (
      <div>
        <p>Too many matches specify another filter</p>
      </div>
    )
  }
}

export default Country;
