import { useEffect, useState } from "react"
import noteService from './services/note';
import Note from "./Note";

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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
        alert(`the note ${note.content} was already deleted from server`)
        setNotes(notes.filter(n => n.id !== note.id))
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
      <h2>Notes</h2>
      <div>
        <button type="button" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note => {
            return <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note)} />
          })
        }
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App