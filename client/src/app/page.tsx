"use client";

import LoginModal from "@/components/AuthModal/AuthModal";
import { Websocket } from "@/components/Websocket";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <LoginModal/>
      <Websocket/>
    </>
  );
}
