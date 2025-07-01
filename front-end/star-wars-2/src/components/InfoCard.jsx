import React from "react";
import '../App.css'

const InfoCard = ({ info }) => {
  return (
    <div class="info">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {info.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Born: {info.birth_year}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Height: {info.height} cm
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Mass: {info.mass} kg
          </span>
        </div>
      </div>
    </div>
  );
};


export default InfoCard;
