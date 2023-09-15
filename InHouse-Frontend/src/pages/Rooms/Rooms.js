import React, { useEffect, useState } from "react";
import AddRoomModal from "../../components/AddRoomModal.js/AddRoomModal";
import RoomCard from "../../components/RoomCard/RoomCard";
import Loader from "../../components/shared/Loader/Loader";
import { getAllRooms } from "../../http";
import styles from "./Rooms.module.css";

const Rooms = () => {
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      const { data } = await getAllRooms();
      setRooms(data);
      setLoading(false);
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
      {loading ? (
        <div>
          <Loader message="Loading, please wait.." />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Rooms;
