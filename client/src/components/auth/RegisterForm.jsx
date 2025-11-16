import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function RegisterForm({ switchMode }) {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(form); // 🔥 Call AuthContext signup()

      console.log("Registered:", form);
    } catch (err) {
      console.error("Register Error:", err);
    }

    setLoading(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      {/* Username */}
      <div className="space-y-2">
        <label className="text-zinc-300">Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 outline-none"
          placeholder="johndoe"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-zinc-300">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 outline-none"
          placeholder="you@example.com"
          required
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-zinc-300">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 outline-none"
          placeholder="••••••••"
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-200 transition disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Register"}
      </button>

      <p className="text-center text-zinc-500 text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchMode}
          className="text-zinc-300 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
