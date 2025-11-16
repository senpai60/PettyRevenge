import React, { useState } from "react";

export default function LoginForm({ switchMode }) {
  const [form, setForm] = useState({
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
      // 🔥 plug your API here
      // await authApi.login(form.email, form.password);

      console.log("Login data:", form);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="text-center text-zinc-500 text-sm">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={switchMode}
          className="text-zinc-300 hover:underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}
