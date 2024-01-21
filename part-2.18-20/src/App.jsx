import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import Filter from "./components/Filter"
import Content from "./components/Content"

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res => {
      setCountries(res.data)
    })
  }, [])

  const handleChange = event => {
    setValue(event.target.value)
  }

  const showCountry = country => {
    setValue('')
    setCountry(country)
  }

  const filteredCountries = value 
    ? countries.filter(country => country.name.common.toLowerCase().includes(value))
    : country
    ? [].concat(country)
    : [];

  return (
    <div>
      <Filter value={value} handleValueChange={handleChange} />
      <Content countries={filteredCountries} handleClick={showCountry}/>
    </div>
  )
}

export default App