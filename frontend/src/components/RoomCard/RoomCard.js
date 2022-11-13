import React from "react";
import styles from "./RoomCard.module.css";
import {useNavigate} from 'react-router-dom';

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/room/${room.id}`)}} className={styles.card}>
      <h3 className={styles.topic}>{room.topic}</h3>
      <div
        className={`${styles.speakers} ${
          room.speakers.length === 1 ? styles.singleSpeaker : ""
        }`}
      >
        <div className={styles.avatars}>
          {room.speakers.map((speaker) => {
            return <img key={speaker.id} src={speaker.avatar} alt="img" />;
          })}
        </div>
        <div className={styles.names}>
          {room.speakers.map((speaker) => {
            return (
              <div key={speaker.id} className={styles.nameWrapper}>
                <span>{speaker.name}</span>
                <img src="/images/speaker_chat.png" alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="/images/member.png" alt="" />
      </div>
    </div>
  );
};

export default RoomCard;
