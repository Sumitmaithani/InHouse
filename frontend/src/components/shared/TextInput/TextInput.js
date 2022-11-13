import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <div>
      <input
        style={
          props.error == "true"
            ? { border: "2px solid red" }
            : props.fullwidth === "true"
            ? { width: "100%" }
            : { width: "inherit" }
        }
        className={styles.input}
        type="text"
        {...props}
      />
    </div>
  );
};

export default TextInput;
