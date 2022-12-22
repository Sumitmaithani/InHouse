import React from "react";
import styles from "./ChatComponent.module.css";
import ChatMessage from "./ChatMessage";

const ChatComponent = ({ setDoubt, doubt, allDoubts, askDoubt }) => {
  return (
    <div>
      <h3 className={styles.heading}>Chat Room</h3>
      <div className={styles.chatContainer}>
        {Object.keys(allDoubts).length > 0 &&
          Object.keys(allDoubts).map((key, index) => (
            <ChatMessage
              key={index}
              username={Object.keys(allDoubts[key])}
              text={Object.values(allDoubts[key])}
            />
          ))}
      </div>
      <div className={styles.inputBtnContainer}>
        <input
          className={styles.input}
          type="text"
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          onKeyDown={(event) => {
            if (event.key == "Enter") {
              askDoubt()
            }
          }}
        />
        <button className={styles.sendBtn} onClick={askDoubt}>
          <img className={styles.btnImg} src="/images/send.png" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
