const InputFilter = ({ filter, handleFilter }) => {
  return (
    <div>
      <label htmlFor="filter">filter: </label>
      <input type="text" id="filter" value={filter} onChange={handleFilter} />
    </div>
  );
};

export default InputFilter;
