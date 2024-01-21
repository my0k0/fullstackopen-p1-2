import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const [weather, setWeather] = useState(null)

  const fahToCelsius = (fah) => {
    return ((5 / 9) * (fah - 32)).toFixed(2);
  }

  useEffect(() => {
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    const params = {
      key: import.meta.env.VITE_WEATHER_KEY
    }
    axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon} `, {params}).then(res => {
      setWeather(res.data)
      // console.log(res.data)
    })
  }, [])

  if (weather) {
    return (
      <div>
        <h2>{ country.name.common }</h2>
        <p>{ country.capital[0] }</p>
        <p>{ country.borders.area }</p>
        <h2>languages: </h2>
        <ul>
          {
            Object.values(country.languages).map((lang, index) => {
              return <p key={index}>{ lang }</p>
            })
          }
        </ul>
        <img src={country.flags.png} />
        <h2>Weather in { country.name.common }</h2>
        <p>temperature { fahToCelsius(weather.currentConditions.temp) } Celsius</p>
        <p>wind { weather.currentConditions.windspeed } m/s</p>
      </div>
    )
  }

  return (
    <div>
      <h2>{ country.name.common }</h2>
      <p>{ country.capital[0] }</p>
      <p>{ country.borders.area }</p>
      <h2>languages: </h2>
      <ul>
        {
          Object.values(country.languages).map((lang, index) => {
            return <p key={index}>{ lang }</p>
          })
        }
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

export default Country