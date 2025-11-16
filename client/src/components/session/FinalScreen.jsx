import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { sessionApi } from "../../api/sessionApi";

export default function FinalScreen() {
  const { answers, name } = useSession();
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await sessionApi.post("/generate", { name, answers });
    setResult(res.data.output);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      {!result ? (
        <button
          onClick={generate}
          className="bg-white text-black py-3 px-6 rounded-xl"
        >
          Generate Final Revenge 😈
        </button>
      ) : (
        <p className="text-lg leading-relaxed">{result}</p>
      )}
    </div>
  );
}
