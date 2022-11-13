import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/AddRoomModal.js/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import { getAllRooms } from "../../http";
import styles from "./Rooms.module.css";

// const rooms = [
//   {
//     id: 1,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 3,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 4,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 5,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 6,
//     topic: "Which framework best for frontend ?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 7,
//     topic: "What’s new in machine learning?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 8,
//     topic: "Why people use stack overflow?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
//   {
//     id: 9,
//     topic: "Artificial inteligence is the future?",
//     speakers: [
//       {
//         id: 1,
//         name: "John Doe",
//         avatar: "/images/dp.png",
//       },
//       {
//         id: 2,
//         name: "Jane Doe",
//         avatar: "/images/dp.png",
//       },
//     ],
//     totalPeople: 40,
//   },
// ];

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
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
            <button onClick={openModal} className={styles.startRoomButton}>
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
      {showModal && <AddRoomModal onClose={closeModal} />}
    </>
  );
};

export default Rooms;
