import { useEffect, useState } from "react";
import phonebookService from "./services/phonebook";
import PersonForm from "./PersonForm";
import Person from "./Person";
import InputFilter from "./InputFilter";
import Notification from "./Notification";

const App = () => {
  const [persons, setPerson] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notiMessage, setNotiMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

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
    phonebookService
      .delete(id)
      .then(() => {
        setIsSuccess(true);
        setPerson(persons.filter((p) => p.id !== id));
        setNotiMessage(`Deleted ${person.name}`);

        setTimeout(() => {
          setNotiMessage(null);
        }, 3000);
      })
      .catch(() => {
        setIsSuccess(false);
        setNotiMessage(
          `Information of ${person.name} has been removed from server`,
        );

        setTimeout(() => {
          setNotiMessage(null);
        }, 3000);
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
        setIsSuccess(true);
        setPerson(persons.map((p) => (p.id === person.id ? updatedPerson : p)));
        setNotiMessage(
          `Changed ${updatedPerson.name} phone to ${updatedPerson.number}`,
        );
        setTimeout(() => {
          setNotiMessage(null);
        }, 3000);
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
      setIsSuccess(true);
      setPerson(persons.concat(addedPerson));
      setNotiMessage(`Aded ${addedPerson.name}`);
      setTimeout(() => {
        setNotiMessage(null);
      }, 3000);
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
      <Notification message={notiMessage} status={isSuccess} />
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
