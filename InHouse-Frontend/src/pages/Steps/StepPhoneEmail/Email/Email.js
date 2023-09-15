import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../../components/shared/Loader/Loader";

const Email = ({ onClick }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("false");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  function isValid(email) {
    if (!email) {
      setErrorMsg("email field is required.");
      setError("true");
      return false;
    } else if (!email.match(mailformat)) {
      setErrorMsg("It should be actual email.");
      setError("true");
      return false;
    } else {
      return true;
    }
  }

  async function submit() {
    if (!isValid(email)) {
      return;
    }
    setLoading(true);
    const { data } = await sendOtp({ phone: email });
    toast.info(`Your OTP is ${data.otp}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log("Your OTP is ", data.otp);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onClick();
    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <div style={{ marginTop: "-80px" }}>
          <Loader message="Loading, please wait.." />
        </div>
      ) : (
        <Card title="Enter you email id" logo="email_icon">
          <TextInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("false");
            }}
            placeholder="youremail@gmail.com"
            error={error}
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                submit();
              }
            }}
          />
          {error == "true" && (
            <div className={styles.error} style={{ paddingRight: "55px" }}>
              <AiOutlineInfoCircle style={{ marginRight: "5px" }} />
              {errorMsg}
            </div>
          )}
          <div>
            <div className={styles.actionButtonWrap}>
              <Button text="Next" onClick={submit} />
            </div>
            <p className={styles.bottomParagrap}>
              By entering your email id, you're agreeing to our Terms of Service
              and Privacy Policy. Thanks!
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default Email;
