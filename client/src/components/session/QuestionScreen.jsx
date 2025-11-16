import React from "react";
import { useSession } from "../../context/SessionContext";
import SliderInput from "../ui/SliderInput";
import OptionsInput from "../ui/OptionsInput";
import TextInput from "../ui/TextInput";

export default function QuestionScreen() {
  const { questions, current, saveAnswer, nextQuestion } = useSession();
  const q = questions[current];

  if (!q) return <p>Loading…</p>;

  return (
    <section className="max-w-2xl mx-auto space-y-8 py-10">
      <h2 className="text-xl font-medium">{q.text}</h2>

      {q.type === "slider" && (
        <SliderInput question={q} value={""} onChange={saveAnswer} />
      )}

      {q.type === "options" && (
        <OptionsInput question={q} value={""} onChange={saveAnswer} />
      )}

      {q.type === "text" && (
        <TextInput question={q} value={""} onChange={saveAnswer} />
      )}

      <button
        onClick={nextQuestion}
        className="bg-white text-black py-3 px-8 rounded-xl"
      >
        Next
      </button>
    </section>
  );
}
