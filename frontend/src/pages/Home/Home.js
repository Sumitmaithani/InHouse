import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077FF",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const navigate = useNavigate();

  function startRegister() {
    navigate("/authenticate");
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to InHouse" logo="logo">
        <p className={styles.text}>
          We’re working hard to get InHouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
