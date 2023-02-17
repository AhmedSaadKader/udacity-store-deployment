const FormRow = ({ labelName, name, type, handleChange }) => {
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelName}
      </label>
      <input name={name} type={type} className="form-input" onChange={handleChange} />
    </div>
  );
};

export default FormRow;
