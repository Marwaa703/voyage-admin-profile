"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slices/admin";
const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await loginUser({ email, password });
      router.push("/home");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">
        Login to Voyage
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center bold">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-white bg-opacity-30 text-white rounded-md hover:bg-opacity-50 transition duration-300"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
