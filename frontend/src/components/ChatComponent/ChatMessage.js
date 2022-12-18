import React from 'react'
import styles from "./ChatComponent.module.css";

const ChatMessage = ({username,text}) => {
  return (
    <div className={styles.msgContainer}>
        <h4 className={styles.msgSender}>{username}</h4>
        <h5 className={styles.msg}>{text}</h5>
    </div>
  )
}

export default ChatMessage