import React, { useEffect, useRef, useState } from "react";
import {
  useParams,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Editor from "../../components/Editor/Editor";
import { initSocket } from "../../socket";
import ACTIONS from "../../actions";
import styles from "./Room.module.css";
import ChatComponent from "../../components/ChatComponent/ChatComponent";

const Room = () => {
  const { id: roomId } = useParams();
  const user = useSelector((state) => state.auth.user);
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const codeRef = useRef(null);
  const location = useLocation();

  const [doubt, setDoubt] = useState("");
  const [allDoubts, setAllDoubts] = useState({});

  const currentUser = user.name;

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later.");
        reactNavigator("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        user: user,
      });

      socketRef.current.on("doubt", ({ doubts, username, socketId }) => {
        setAllDoubts(doubts);
        if (username !== currentUser) {
          toast.success(`${username} send a message!`);
        }
      });

      // Listening for joined event
      socketRef.current.on(ACTIONS.JOINED, ({ clients, user, socketId }) => {
        if (user?.name !== currentUser) {
          toast.success(`${user?.name} joined the room.`);
        }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      // Listening for disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, user }) => {
        toast.success(`${user?.name} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  function leaveRoom() {
    reactNavigator("/");
    setAllDoubts({});
  }

  async function askDoubt() {
    socketRef.current.emit("doubt", {
      roomId,
      username: currentUser,
      doubt,
    });
    setDoubt("");
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={styles.room_container}>
        <div className={styles.leftbox}>
          <div className={styles.leftBox_inside}>
            <h1 className={styles.heading}>{location.state.roomName}</h1>
            <div className={styles.subHeading}>All connected clients :</div>
            {clients?.map((client) => {
              return (
                <div className={styles.user_container} key={client?.socketId}>
                  <img
                    className={styles.user_avatar}
                    src={client?.user?.avatar}
                    alt="dp"
                  />
                  <h4 className={styles.user_name}>{client?.user?.name}</h4>
                </div>
              );
            })}
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>
            <button className={styles.leave_button} onClick={leaveRoom}>
              Leave quietly
            </button>
          </div>
        </div>
        <div className={styles.middlebox}>
          <Editor
            socketRef={socketRef}
            roomId={roomId}
            onCodeChange={(code) => {
              codeRef.current = code;
            }}
          />
        </div>
        <div className={styles.rightbox}>
          <ChatComponent
            allDoubts={allDoubts}
            doubt={doubt}
            setDoubt={setDoubt}
            askDoubt={askDoubt}
          />
        </div>
      </div>
    </>
  );
};

export default Room;
