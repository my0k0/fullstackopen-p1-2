import { useEffect, useState } from "react";
import phonebookService from "./services/phonebook";
import PersonForm from "./PersonForm";
import Person from "./Person";
import InputFilter from "./InputFilter";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleNumber = (event) => {
    setNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleting = (id) => {
    const person = persons.find((p) => p.id === id);
    const ans = confirm(`Delete ${person.name} ?`);
    if (!ans) return;
    phonebookService.delete(id).then(() => {
      setPerson(persons.filter((p) => p.id !== id));
    });
  };

  useEffect(function () {
    phonebookService.getAll().then((data) => {
      setPerson(data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((p) => p.name === name);
    if (person) {
      const ans = confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (!ans) return;

      const obj = {
        ...person,
        number: number,
      };

      phonebookService.update(person.id, obj).then((updatedPerson) => {
        setPerson(persons.map((p) => (p.id === person.id ? updatedPerson : p)));
      });

      return;
    }

    const maxId = Math.max(...persons.map((p) => p.id));
    const newPerson = {
      id: maxId + 1,
      name: name,
      number: number,
    };

    phonebookService.create(newPerson).then((addedPerson) => {
      setPerson(persons.concat(addedPerson));
    });
  };

  const filteredPerson = filter
    ? persons.filter(
        (p) => p.name.includes(filter) || p.number.includes(filter),
      )
    : persons;

  return (
    <div>
      <h2>Phone Book</h2>
      <InputFilter filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        name={name}
        number={number}
        handleName={handleName}
        handleNumber={handleNumber}
        handleSubmit={addPerson}
      />
      <h2>Numbers</h2>
      <Person persons={filteredPerson} handleDeletePerson={handleDeleting} />
    </div>
  );
};

export default App;
