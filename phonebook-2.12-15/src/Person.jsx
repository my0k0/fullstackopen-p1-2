const Person = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {persons.map((p) => {
        return (
          <p key={p.id}>
            {p.name} {p.number}
            <button type="button" onClick={() => handleDeletePerson(p.id)}>
              delete
            </button>
          </p>
        );
      })}
    </div>
  );
};

export default Person;
