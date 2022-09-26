import React, {  useRef, useState } from "react";
import { db } from "../Firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IoMdSend } from "react-icons/io";

const Input = () => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  const handleSend = async () => {
    try {
      if (text.length) {
        setText("");
        const user = JSON.parse(localStorage.getItem("currentUser"));
          await addDoc(collection(db, "messages"), {
            message: text,
            user: user.user.email,
            createdAt: serverTimestamp(),
          });
      } else {
      
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat-input">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{ width: "100%" }}
      >
        <input
          type="text"
          className="input-msg"
          placeholder="Type Something..."
          value={text}
          ref={inputRef}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <div className="send-button">
        <IoMdSend onClick={handleSend} />
      </div>
    </div>
  );
};

export default Input;
