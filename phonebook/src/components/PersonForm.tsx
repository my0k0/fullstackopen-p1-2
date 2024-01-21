import React from "react"

const PersonForm = ({handleSubmit, newName, handleAddPerson, newNumber, handleAddNumber}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input type="text" value={newName} onChange={handleAddPerson} />
            </div>
            <div>
            number: <input type="text" value={newNumber} onChange={handleAddNumber} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm