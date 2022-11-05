import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";
import { sendOtp } from "../../../../http/index";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import { toast } from "react-toastify";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Phone = ({ onClick }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("false");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const digits_only = string => [...string].every(c => '0123456789'.includes(c));

  function isValid(number) {
    if (!number) {
      setErrorMsg("Phone number field is required.");
      setError("true");
      return false;
    } else if (!digits_only(number)) {
      setErrorMsg("It should contain only numbers.");
      setError("true");
      return false;
    } else if (number.length != 10) {
      setErrorMsg("It should contain only 10 digits.");
      setError("true");
      return false;
    } else {
      return true;
    }
  }

  async function submit() {
    if (!isValid(phoneNumber)) {
      return;
    }
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onClick();
  }

  return (
    <Card title="Enter you phone number" logo="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
          setError("false");
        }}
        placeholder="+919823324223"
        error={error}
      />
      {error == "true" && (
        <div className={styles.error}>
          <AiOutlineInfoCircle style={{ marginRight: "5px" }} />
          {errorMsg}
        </div>
      )}
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagrap}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
