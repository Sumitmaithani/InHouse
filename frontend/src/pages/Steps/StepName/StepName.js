import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepName.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import { AiOutlineInfoCircle } from "react-icons/ai";

const StepName = ({ onClick }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);
  const [error, setError] = useState("false");
  const [errorMsg, setErrorMsg] = useState("");

  function isValid(fullname) {
    if (!fullname) {
      setErrorMsg("It should contain name field.");
      setError("true");
      return false;
    } else if (fullname.length < 4) {
      setErrorMsg("Full name must be 4 char long.");
      setError("true");
      return false;
    } else {
      return true;
    }
  }

  function nextStep(){
    if (!isValid(fullname)) {
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
            onChange={(e) => {
              setFullname(e.target.value);
              setError("false");
            }}
            placeholder="Your name"
            error={error}
          />
          {error == "true" && (
            <div className={styles.error}>
              <AiOutlineInfoCircle style={{ marginRight: "5px" }} />
              {errorMsg}
            </div>
          )}
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
