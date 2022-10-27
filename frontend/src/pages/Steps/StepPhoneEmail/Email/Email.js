import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import styles from "../StepPhoneEmail.module.css";

const Email = ({onClick}) => {
  const [email, setEmail] = useState("");
  return (
    <Card title="Enter you email id" logo="email_icon">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={onClick} />
        </div>
        <p className={styles.bottomParagrap}>
          By entering your email id, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Email;
