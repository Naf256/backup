import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
     .getAll()
     .then(initialPersons => {
      setPersons(initialPersons)
    })
  },[])
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newNumber,
    }

    personService
     .create(newObject)
     .then(theNewPerson => {
       setPersons(persons.concat(theNewPerson))
       setFilter('')
       setNewName('')
       setNewNumber('')
     })
		.catch(error => {
			console.log(error.response.data.error)
		})

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange}
        filter={filter}
      />
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        people={persons}
        filter={filter}
      />
    </div>
  )
}

export default App;
