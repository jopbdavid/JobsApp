import React from "react";

const FormRow = ({ type, name, values, handleChange, labelText, options }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}:
      </label>
      {/* <input
        type={type}
        name={name}
        value={values}
        className="form-input"
        onChange={handleChange}
      /> */}
      {options ? (
        <select
          name={name}
          value={values}
          className="form-select"
          onChange={handleChange}
          type={type}
        >
          {" "}
          {options.map((option, index) => {
            return (
              <option value={option} key={index}>
                {option}
              </option>
            );
          })}{" "}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={values}
          className="form-input"
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormRow;
