import React from "react";

const FormRow = ({ type, name, values, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}:
      </label>
      <input
        type={type}
        name={name}
        value={values.name}
        className="form-input"
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
