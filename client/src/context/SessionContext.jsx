// src/context/SessionContext.js
import { createContext, useContext, useState } from "react";
import { sessionApi } from "../api/sessionApi";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [step, setStep] = useState("intro"); // intro | questions | final
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const saveAnswer = (id, value) => {
    setAnswers((p) => ({ ...p, [id]: value }));
  };

  // Start the session: ask backend to generate first question (we also provide name)
  const startSession = async (userName) => {
    setName(userName);
    setStep("questions");
    setAnswers({});
    setQuestions([]);
    setCurrent(0);

    try {
      setLoading(true);
      const res = await sessionApi.post("/start", { name: userName });
      const q = res.data.question;
      if (q) {
        setQuestions([q]);
        setCurrent(0);
      } else {
        console.error("No question returned from start");
      }
    } catch (err) {
      console.error("startSession error:", err);
      // fallback: move to final or show UI error in real app
    } finally {
      setLoading(false);
    }
  };

  // Ask backend for the next question. We send the full session context so backend can "remember"
  const nextQuestion = async () => {
    // if next would be the 5th question (index 4) and we've reached it, go to final step
    if (current + 1 === 5) {
      setStep("final");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name,
        questions, // all previously generated questions
        answers,
        current, // index of the currently displayed question
      };

      const res = await sessionApi.post("/next", body);
      const q = res.data.question;
      if (q) {
        setQuestions((p) => [...p, q]);
        setCurrent((c) => c + 1);
      } else {
        console.error("No question returned from next");
      }
    } catch (err) {
      console.error("nextQuestion error:", err);
      // fallback: setStep("final")
    } finally {
      setLoading(false);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        step,
        name,
        questions,
        current,
        answers,
        saveAnswer,
        startSession,
        nextQuestion,
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
