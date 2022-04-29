import React from "react";

const Input = ({ name, label, placeHolder, inputType, InputValue, error, handleInputChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={inputType} className="form-control" id={name} aria-describedby="emailHelp" placeholder={placeHolder} name={name} value={InputValue} onChange={(evt) => handleInputChange(evt)} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
