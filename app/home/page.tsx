"use client"; 
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center login-bg">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-semibold text-white mb-4">Welcome to Voyage</h1>
        <p className="text-white mb-4">
          You have successfully logged in! Enjoy your stay.
        </p>
        <button
          onClick={() => alert('This button could navigate somewhere!')}
          className="mt-4 py-2 px-4 bg-white bg-opacity-30 text-white rounded-md hover:bg-opacity-50 transition duration-300"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default Home;
