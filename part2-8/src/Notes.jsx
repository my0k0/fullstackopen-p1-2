import Note from "./Note"

const Notes = ({notes, handleToggle}) => {
    return (
        <ul>
            {
                notes.map(note => {
                    return <Note key={note.id} note={note} toggleImportance={() => handleToggle(note)} />
                })
            }
        </ul>
    )
}

export default Notes