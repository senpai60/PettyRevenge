export default function OptionsInput({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="text-xl font-medium text-zinc-300">
        {question.text}
      </label>

      <div className="flex flex-wrap gap-3">
        {question.options.map((option) => {
          const selected = value === option;

          return (
            <button
              key={option}
              onClick={() => onChange(question.id, option)}
              className={`
                px-4 py-2 rounded-xl text-base font-medium
                border transition-all duration-200
                ${selected
                  ? "bg-zinc-200 text-zinc-900 border-zinc-300 shadow-sm"
                  : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800"
                }
              `}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
