export default function SliderInput({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={question.id}
        className="text-xl font-medium text-zinc-300"
      >
        {question.text}
      </label>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min={question.min}
          max={question.max}
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          className="
            w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer
            accent-white
          "
        />
        <span className="text-2xl font-semibold text-zinc-200 w-10 text-center">
          {value}
        </span>
      </div>
    </div>
  );
}
