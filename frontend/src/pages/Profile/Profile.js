import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { logout } from "../../http";
import { setAuth } from "../../store/authSlice";

const Profile = () => {
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
    <div className={styles.container_box}>
      <div className={styles.heading_container}>
        <h1 className={styles.heading}>Profile</h1>
        <button className={styles.leave_button} onClick={logoutUser}>
          Log out
        </button>
      </div>
      <div className={styles.profile_container}>
        <div className={styles.navRight}>
          <img className={styles.avatar} src={user?.avatar} alt="DP" />
          <div className={styles.usernames}>
            <h3>{user?.name}</h3>
            <h3 className={styles.userhandle}>
              @{user?.name?.toLowerCase().replace(/\s/g, "")}
            </h3>
          </div>
          <button className={styles.follow_button}>following</button>
          <img src="/images/threedot.png" />
        </div>
        <div className={styles.number_container}>
          <div>
            <h1 className={styles.number}>25</h1>
            <h3 className={styles.number_text}>Followers</h3>
          </div>
          <div>
            <h1 className={styles.number}>1</h1>
            <h3 className={styles.number_text}>Following</h3>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.content}>
          Full-stack Software Developer and Javascript Enthusiast, Who Loves
          Building Things In Javascript. 🔥 👨🏽‍💻🏅
        </p>
      </div>
    </div>
  );
};

export default Profile;
