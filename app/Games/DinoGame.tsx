import { useState, useEffect } from 'react';

const DinoGame = () => {
  

  return (
    <div className="relative w-full h-full bg-gray-800 overflow-hidden">
      <div
        className="absolute bottom-0 left-20 w-12 h-12 bg-green-500 rounded-md"
        style={{ bottom: 0 }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-10 h-10 bg-red-500"
        style={{ left: 100, bottom: 0 }}
      ></div>
      <div className="absolute top-4 left-4 text-lg font-bold">
        Score: {0}
      </div>
      
    </div>
  );
};

export default DinoGame;