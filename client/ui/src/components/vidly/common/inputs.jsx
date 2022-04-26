import React from "react";

const Input = ({ name, label, placeHolder, inputType, InputValue, handleInputChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={inputType} className="form-control" id={name} aria-describedby="emailHelp" placeholder={placeHolder} name={name} value={InputValue} onChange={(evt) => handleInputChange(evt)} />
    </div>
  );
};

export default Input;
