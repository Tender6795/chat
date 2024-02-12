"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

type Message = string;

interface State {
  messages: Message[];
  newMessage: string;
}

const socket = io("http://localhost:5000", {
  extraHeaders: {
    authorization: localStorage.getItem("token") || 'vcvcvcvc'
  }
});

export const Websocket: React.FC = () => {
  const [state, setState] = useState<State>({
    messages: [],
    newMessage: "",
  });

  useEffect(() => {
    socket.on('connect', ()=>{
        // debugger
    })
    socket.on("OnMessage", (message: Message) => {
      debugger;
      setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    });

    return () => {
      socket.off("OnMessage");
      socket.off("createMessage");
      socket.off("connect");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("createMessage", state.newMessage);
    setState((prevState) => ({
      ...prevState,
      newMessage: "",
    }));
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {state.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={state.newMessage}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            newMessage: e.target.value,
          }))
        }
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};
