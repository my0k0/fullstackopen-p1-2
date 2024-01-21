import { useEffect, useState } from "react"
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [person, setPerson] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPerson, setFilteredPerson] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        console.log(res.data)
        setPerson(res.data)
        setFilteredPerson(res.data)
      })
  }, [])

  const handleAddPerson = event => {
    setNewName(event.target.value)
  }

  const handleAddNumber = event => {
    setNewNumber(event.target.value)
  }
  const handleFiltering = event => {
    const filtered = person.filter(p => {
      const regex = new RegExp(event.target.value, "i")

      return regex.test(p.name)
    })

    setFilteredPerson(filtered)
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (person.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPerson(person.concat({name: newName, number: newNumber}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFiltering}></Filter>
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleAddPerson={handleAddPerson}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons person={filteredPerson} />
    </div>
  )
}

export default App