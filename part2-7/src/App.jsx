import { useEffect, useState } from "react"
import noteService from './services/note';
import Notes from "./Notes";
import NoteForm from "./NoteForm";
import Notification from "./Notification";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(function() {
    console.log('effect')
    noteService.getAll().then(data => {
      console.log('promise fullfilled')
      setNotes(data);
    })
  }, [])
  console.log('render', notes.length, 'notes');

  const handleChange = event => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = note => {
    const newObj = {
      ...note,
      important: !note.important
    }

    noteService
      .update(note.id, newObj)
      .then(data => {
        setNotes(notes.map(note => {
          return note.id === data.id ? data : note 
        }))
      })
      .catch(_ => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`
        );

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== note.id));
      });
  }

  const addNote = event => {
    event.preventDefault()

    const newObj = {
      id: notes.length + 1,
      important: Math.random() < 0.5,
      content: newNote
    }

    noteService.create(newObj).then(data => {
      setNotes(notes.concat(data))
      setNewNote('')
    })
  }

  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <Notes notes={notesToShow} handleToggle={(id) => toggleImportanceOf(id)}></Notes>
      <NoteForm handleSubmit={addNote} newNote={newNote} handleNewNote={handleChange}></NoteForm>
    </div>
  )
}

export default App