import Country from "./Country"

const Content = ({countries, handleClick}) => {
  if (!countries || countries.length === 0)
    return null

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>

  if (countries.length === 1)
    return <Country country={ countries[0] } />

  return (
    <div>
      {
        countries.map((country, index) => {
          return (
            <p key={index}>
              { country.name.common }
              <button type="button" onClick={() => handleClick(country)}>show</button>
            </p>
          )
        })
      }
    </div>
  )
}

export default Content