import React from "react";

import styles from "../styles";

const regex = /^[A-Za-z0-9]+$/;

const CustomInput = ({ label, placeholder, value, handleValueChange }) => {
  return (
    <>
      <label htmlFor="name" className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => {
          if (target.value === "" || regex.test(target.value))
            handleValueChange(target.value);
        }}
        className={styles.input}
      />
    </>
  );
};

export default CustomInput;
