import IntroScreen from "../components/session/IntroScreen";
import QuestionScreen from "../components/session/QuestionScreen";
import FinalScreen from "../components/session/FinalScreen";
import { useSession } from "../context/SessionContext";

export default function Home() {
  const { step } = useSession();

  if (step === "intro") return <IntroScreen />;
  if (step === "questions") return <QuestionScreen />;
  if (step === "final") return <FinalScreen />;

  return null;
}
