import { useState } from 'react'
import useCountry from './hooks/useCountry'

const Country = ({ country }) => {
  if (!country) return null
  if (!country.found) return <p>not found...</p>

  const { name, capital, population, flags } = country.data
  return (
    <div>
      <h3>{name.common}</h3>
      <div>capital: {capital}</div>
      <div>population: {population}</div>
      <img src={flags.png} height='100' alt={`flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const country = useCountry(query)

  const fetch = (e) => {
    e.preventDefault()
    setQuery(name)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter country name"
        />
        <button type="submit">find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
