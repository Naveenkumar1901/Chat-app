import React, { useEffect, useRef, useState } from "react";
import { db } from "../Firebase-config";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { AiOutlineDown } from "react-icons/ai";
import moment from "moment";

let snapMessages;

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser")).user
    .email;
  const getMessages = async () => {
    setLoading(true);
    snapMessages = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt", "asc")),
      (snapshot) => {
        setLoading(false);
        const data = snapshot.docs.map((doc) => doc.data());
        setMessages(data);
        scrollToBottom1();
      }
    );
  };

  const scrollToBottom1 = () => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView();
  };

  useEffect(() => {
    getMessages();
    return () => snapMessages(); // unsubcribe listener
  }, []);
 

  const OwnerMessage = ({ message, createdAt, user }) => (
    <div className="message-wrapper">
      <p className="owner-message">
        <span className="ownuser-name">you</span>
        <span style={{ width: "100%" }}>{message}</span>
        <p className="ownermsg-time" style={{ fontSize: "10px" }}>
          {createdAt && createdAt.seconds
            ? moment(new Date(createdAt.seconds * 1000)).format("MMMD, h:mm a")
            : "now"}
        </p>
      </p>
    </div>
  );
  const ThirdPartyMessage = ({ message, createdAt, user }) => (
    <div className="message-wrapper">
      <p className="third-party-message">
        <span className="thirduser-name">{user.split("@")[0]} </span>
        <span style={{ width: "100%" }}>{message}</span>
        <p className="thirdpartymsg-time" style={{ fontSize: "10px" }}>
          {createdAt && createdAt.seconds
            ? moment(new Date(createdAt.seconds * 1000)).format("MMM D, h:mm a")
            : "now"}
        </p>
      </p>
    </div>
  );

  return (
    <div className="messages">
      {loading ? (
        <div className="spinner-box">
          <div className="three-quarter-spinner"></div>
        </div>
      ) : (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          {messages.map(({ message, user, createdAt }) =>
            currentUser === user ? (
              <OwnerMessage
                message={message}
                createdAt={createdAt}
                user={user}
              />
            ) : (
              <ThirdPartyMessage
                message={message}
                createdAt={createdAt}
                user={user}
              />
            )
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default Messages;
