const NoteForm = ({handleSubmit, newNote, handleNewNote}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={newNote} onChange={handleNewNote} />
            <button type="submit">save</button>
        </form>
    )
}

export default NoteForm