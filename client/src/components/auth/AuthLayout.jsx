export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
        
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          Petty Revenge
        </h1>
        <p className="text-zinc-400 text-center mb-10">
          Enter the toxic headquarters 💅
        </p>

        {children}
      </div>
    </div>
  );
}
