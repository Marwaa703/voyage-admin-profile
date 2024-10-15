"use client";
import React from "react";

const backgrounds = [
  "https://images.pexels.com/photos/5440838/pexels-photo-5440838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5560679/pexels-photo-5560679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5433932/pexels-photo-5433932.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/2761475/pexels-photo-2761475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

interface SettingsProps {
  setBackgroundImage: (image: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ setBackgroundImage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-xl font-semibold text-white mb-4">Change Background</h3>
      <div className="grid grid-cols-2 gap-4">
        {backgrounds.map((image, index) => (
          <div
            key={index}
            className="w-24 h-24 cursor-pointer rounded-lg overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300"
            onClick={() => setBackgroundImage(image)} 
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Settings;
