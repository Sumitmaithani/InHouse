import React, { useState } from "react";
import Email from "./Email/Email";
import Phone from "./Phone/Phone";
import styles from "./StepPhoneEmail.module.css";

const phoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onClick }) => {
  const [type, setType] = useState("phone");
  const Component = phoneEmailMap[type];

  function onNext() {}
  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button className={`${styles.tabButton} ${type === 'phone' && styles.active}`} onClick={() => setType("phone")}><img src='/images/phone_icon.png' /></button>
            <button className={`${styles.tabButton} ${type === 'email' && styles.active}`} onClick={() => setType("email")}><img src='/images/email.png' /></button>
          </div>
          <Component onClick={onClick} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
