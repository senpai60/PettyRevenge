import React, { useState } from 'react';
import { rapidQuestions } from '../data/quetions';
import SliderInput from '../components/ui/SliderInput';
import OptionsInput from '../components/ui/OptionsInput';
import TextInput from '../components/ui/TextInput';

/**
 * Renders the main quiz interface, managing state and mapping questions.
 */
function Home() {
  const [answers, setAnswers] = useState({ 1: 5 });

  const handleInput = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-16 space-y-12">
      {rapidQuestions.map((q) => {
        const value = answers[q.id] || "";

        if (q.type === "slider")
          return <SliderInput key={q.id} question={q} value={value || q.min} onChange={handleInput} />;

        if (q.type === "options")
          return <OptionsInput key={q.id} question={q} value={value} onChange={handleInput} />;

        if (q.type === "text")
          return <TextInput key={q.id} question={q} value={value} onChange={handleInput} />;

        return null;
      })}

      <div className="pt-4 text-center">
        <button className="bg-white text-zinc-900 text-lg font-semibold py-3 px-8 rounded-xl shadow-md hover:bg-zinc-200 transition-all">
          Generate Plan
        </button>
      </div>
    </section>
  );
}


export default Home;