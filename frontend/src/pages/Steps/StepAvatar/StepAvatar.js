import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import styles from "./StepAvatar.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import {setAuth} from "../../../store/authSlice";

const StepAvatar = ({ onClick }) => {
  const dispatch = useDispatch();

  const { name, avatar } = useSelector((state) => state.activate);
  const [img, setImg] = useState("/images/dp.png");

  function captureImg(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImg(reader.result);
      dispatch(setAvatar(reader.result));
    };
  }

  async function submit() {
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth){
        dispatch(setAuth(data));
      }
      console.log(data);
    } catch (err) {
      console.log("this is",err);
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Okay, ${name}!`} logo="photo">
          <p className={styles.bottomParagraph}>How's this photo?</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImg} src={img} alt="dp" />
          </div>
          <div>
            <input
              onChange={captureImg}
              id="avatarInput"
              type="file"
              className={styles.avatarInput}
            />
            <label className={styles.avatarLabel} htmlFor="avatarInput">
              Choose a different photo
            </label>
          </div>
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepAvatar;
