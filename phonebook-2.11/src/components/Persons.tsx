import React from "react";

const Persons = ({person}) => {
    return person.map(p => {
        return <p key={p.id}>{p.name} {p.number}</p>
    })
}

export default Persons