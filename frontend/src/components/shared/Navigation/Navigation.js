import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const brandstyle = {
    color:'#fff',
    textDecoration:'none',
    fontWeight:'bold',
    fontSize:'22px',
    display:'flex',
    alignItem:'center'
  }

  const logoText = {
    marginLeft: '10px'
  }
  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandstyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>InHouse</span>
      </Link>
    </nav>
  );
};

export default Navigation;
