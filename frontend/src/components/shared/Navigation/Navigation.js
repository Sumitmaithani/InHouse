import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import styles from "./Navigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Navigation = () => {
  const brandstyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItem: "center",
  };

  const logoText = {
    marginLeft: "10px",
  };
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);

  async function logoutUser() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className={`${styles.navbar} container`}>
      <Link style={brandstyle} to="/">
        <img src="/images/logo.png" alt="logo" />
        <span style={logoText}>InHouse</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user?.name}</h3>
          {user?.avatar && (
            <Link to="/">
              <img className={styles.avatar} src={user?.avatar} alt="DP" />
            </Link>
          )}
          <button className={styles.logoutButton} onClick={logoutUser}>
            <BsFillArrowRightCircleFill className={styles.arrow} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
