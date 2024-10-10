import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Login to Voyage</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-white bg-opacity-20 text-white placeholder-white border-none rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
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
