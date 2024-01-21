import React from "react";

const Persons = ({person}) => {
    return person.map((p, i) => {
        return <p key={i}>{p.name} {p.number}</p>
    })
}

export default Persons