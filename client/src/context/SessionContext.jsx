import { createContext, useContext, useState } from "react";
import { sessionApi } from "../api/sessionApi";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [step, setStep] = useState("intro"); // intro | questions | final
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  const saveAnswer = (id, value) => {
    setAnswers((p) => ({ ...p, [id]: value }));
  };

  const startSession = async (userName) => {
    setName(userName);
    setStep("questions");

    const res = await sessionApi.post("/start", { name: userName });
    setQuestions([res.data.question]);
  };

  const nextQuestion = async () => {
    if (current + 1 === 5) {
      setStep("final");
      return;
    }

    const res = await sessionApi.post("/next", { answers });
    setQuestions((p) => [...p, res.data.question]);
    setCurrent((c) => c + 1);
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
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
