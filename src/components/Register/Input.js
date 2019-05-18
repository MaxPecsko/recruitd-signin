import React from "react";

const Input = ({ type, name, content, handleInput }) => {
  return (
    <div id="name-field">
      <label htmlFor="name">{content}</label>
      <input
        type={type}
        placeholder={content}
        id={name}
        name={name}
        required={true}
        onChange={e => handleInput(e.target.value)}
      />
    </div>
  );
};

export default Input;
