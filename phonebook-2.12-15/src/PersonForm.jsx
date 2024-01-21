const PersonForm = ({
  name,
  number,
  handleName,
  handleNumber,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name: </label>
          <input type="text" id="name" value={name} onChange={handleName} />
        </div>
        <div>
          <label htmlFor="number">number: </label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={handleNumber}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default PersonForm;
