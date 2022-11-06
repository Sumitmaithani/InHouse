import React from "react";
import RoomCard from "../../components/RoomCard/RoomCard";
import styles from "./Rooms.module.css";

const rooms = [
  {
    id: 1,
    topic: "Which framework best for frontend ?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/dp.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/dp.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 3,
    topic: "What’s new in machine learning?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/dp.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/dp.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 4,
    topic: "Why people use stack overflow?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/dp.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/dp.png",
      },
    ],
    totalPeople: 40,
  },
  {
    id: 5,
    topic: "Artificial inteligence is the future?",
    speakers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/images/dp.png",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "/images/dp.png",
      },
    ],
    totalPeople: 40,
  },
    {
      id: 6,
      topic: "Which framework best for frontend ?",
      speakers: [
        {
          id: 1,
          name: "John Doe",
          avatar: "/images/dp.png",
        },
        {
          id: 2,
          name: "Jane Doe",
          avatar: "/images/dp.png",
        },
      ],
      totalPeople: 40,
    },
    {
      id: 7,
      topic: "What’s new in machine learning?",
      speakers: [
        {
          id: 1,
          name: "John Doe",
          avatar: "/images/dp.png",
        },
        {
          id: 2,
          name: "Jane Doe",
          avatar: "/images/dp.png",
        },
      ],
      totalPeople: 40,
    },
    {
      id: 8,
      topic: "Why people use stack overflow?",
      speakers: [
        {
          id: 1,
          name: "John Doe",
          avatar: "/images/dp.png",
        },
        {
          id: 2,
          name: "Jane Doe",
          avatar: "/images/dp.png",
        },
      ],
      totalPeople: 40,
    },
    {
      id: 9,
      topic: "Artificial inteligence is the future?",
      speakers: [
        {
          id: 1,
          name: "John Doe",
          avatar: "/images/dp.png",
        },
        {
          id: 2,
          name: "Jane Doe",
          avatar: "/images/dp.png",
        },
      ],
      totalPeople: 40,
    },
];

const Rooms = () => {
  return (
    <div className="container">
      <div className={styles.roomHeaders}>
        <div className={styles.left}>
          <span className={styles.heading}>All voice rooms</span>
          <div className={styles.searchBox}>
            <img src="/images/search.png" alt="" />
            <input className={styles.searchInput} />
          </div>
        </div>
        <div className={styles.right}>
          <button className={styles.startRoomButton}>
            <img src="/images/room_icon.png" alt="" />
            <span>Start a room</span>
          </button>
        </div>
      </div>

      <div className={styles.roomList}>
        {rooms.map((room) => {
         return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </div>
  );
};

export default Rooms;
