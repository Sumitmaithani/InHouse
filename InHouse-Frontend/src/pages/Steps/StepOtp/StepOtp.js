import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import { verifyOtp } from "../../../http";
import { useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../../../components/shared/Loader/Loader";

const StepOtp = ({ onClick }) => {
  const [otp, setOtp] = useState("");
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const [error, setError] = useState("false");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const digits_only = (string) =>
    [...string].every((c) => "0123456789".includes(c));

  function isValid(otp) {
    if (!otp) {
      setErrorMsg("It should contain OTP field.");
      setError("true");
      return false;
    } else if (!digits_only(otp)) {
      setErrorMsg("It should contain only numbers.");
      setError("true");
      return false;
    } else if (otp.length != 4) {
      setErrorMsg("It should contain only 4 digits.");
      setError("true");
      return false;
    } else {
      return true;
    }
  }

  async function submit() {
    if (!isValid(otp)) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await verifyOtp({ otp, phone, hash });
      dispatch(setAuth(data));
      setLoading(false);
    } catch (err) {
      console.log(err);
      if (err.response.status == 400) {
        toast.error("Invalid OTP!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      }
    }
  }

  return (
    <>
      {loading ? (
        <div>
          <Loader message="Loading, please wait.." />
        </div>
      ) : (
        <div className={styles.cardWrapper}>
          <Card title="Enter the code we just texted you" logo="lock">
            <TextInput
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError("false");
              }}
              error={error}
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  submit();
                }
              }}
            />
            {error == "true" && (
              <div className={styles.error}>
                <AiOutlineInfoCircle style={{ marginRight: "5px" }} />
                {errorMsg}
              </div>
            )}
            <p className={styles.bottomParagraph}>
              Didn’t receive? Tap to resend
            </p>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next" />
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default StepOtp;
