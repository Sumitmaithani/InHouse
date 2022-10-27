import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onClick }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep(){
    if (!fullname){
      return;
    }
    dispatch(setName(fullname));
    onClick();
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="What’s your full name?" logo="google">
          <TextInput
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Your name"
          />
          <p className={styles.bottomParagraph}>
            People use real names at InHouse :)
          </p>
          <div className={styles.actionButtonWrap}>
            <Button onClick={nextStep} text="Next" />
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepName;
