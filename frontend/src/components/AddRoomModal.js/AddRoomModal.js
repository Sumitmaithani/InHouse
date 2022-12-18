import React, { useState } from "react";
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput";
import { createRoom as create } from "../../http/index";
import { useNavigate } from "react-router-dom";

const AddRoomModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState("open");
  const [topic, setTopic] = useState("");

  async function createRoom() {
    try {
      if (!topic) return;
      const { data } = await create({ topic, roomType });
      navigate(`/room/${data.id}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.modalMask}>
      <div className={styles.modalBody}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" alt="" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be discussed</h3>
          <TextInput
            onChange={(e) => setTopic(e.target.value)}
            fullwidth="true"
          />
          <h2 className={styles.subHeading}>Room Type</h2>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${
                roomType === "open" ? styles.active : ""
              }`}
            >
              <img src="/images/Globe.png" alt="globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${
                roomType === "social" ? styles.active : ""
              }`}
            >
              <img src="/images/Users.png" alt="globe" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${
                roomType === "private" ? styles.active : ""
              }`}
            >
              <img src="/images/RoomLock.png" alt="globe" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h2>Start a room, open to everyone</h2>
          <button onClick={createRoom} className={styles.footerButton}>
            <img src="/images/celebrate.png" alt="" />
            <span>Let's Go</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;
