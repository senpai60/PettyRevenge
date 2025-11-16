import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";

export default function IntroScreen() {
  const { startSession } = useSession();
  const [name, setName] = useState("");

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <h1 className="text-3xl font-semibold">Hey babe, what's your name? 😘</h1>

      <input
        className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white"
        placeholder="Your name…"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        disabled={!name.trim()}
        onClick={() => startSession(name)}
        className="bg-white text-black py-3 px-6 rounded-xl disabled:opacity-40"
      >
        Start
      </button>
    </div>
  );
}
