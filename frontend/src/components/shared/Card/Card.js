import React, { Children } from "react";
import styles from "./Card.module.css";

const Card = ({ title, logo, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        {logo && <img src={`/images/${logo}.png`} alt={logo} />}
        {title && <h1 className={styles.heading}>{title}</h1>}
      </div>
      {children}
    </div>
  );
};

export default Card;
