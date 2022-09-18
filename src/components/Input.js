import React, { useState } from "react";
import { db } from "../Firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IoMdSend } from "react-icons/io";
const Input = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [img, setImg] = useState([]);
  const handleSend = async () => {
    setText("");
    try {
      if (text.length) {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        await addDoc(collection(db, "messages"), {
          message: text,
          user: user.user.email,
          createdAt: serverTimestamp()
        });
      } else {
        //nothing
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chat-input">
      <input
        type="text"
        className="input-msg"
        placeholder="Type Something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send-button">
        <IoMdSend onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
