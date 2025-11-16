export default function TextInput({ question, value, onChange }) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={question.id}
        className="text-xl font-medium text-zinc-300"
      >
        {question.text}
      </label>

      <input
        type="text"
        id={question.id}
        value={value}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder={question.placeholder}
        className="
          w-full px-4 py-3 text-zinc-200 bg-zinc-900 
          border border-zinc-800 rounded-xl
          placeholder-zinc-600 
          focus:outline-none focus:border-zinc-600 
          transition-all duration-200
        "
      />
    </div>
  );
}
