import React, { useState } from "react";

export const CycleWeekSelector = ({ setCycleWeek }) => {
  const [week, setWeek] = useState(1); // Initiera med vecka 1

  const handleButtonClick = (weekNumber) => {
    setWeek(weekNumber); // Uppdatera lokalt state
    setCycleWeek(weekNumber); // Skicka uppdaterat värde till föräldern
  };

  return (
    <div className="flex flex-col font-atkinson self-center mb-10">
      <h2 className="text-2xl text-center font-bold mb-4">Vilken vecka är du på?</h2>
      <div>
        {[1, 2, 3, 4].map((weekNumber) => (
          <button
            key={weekNumber}
            onClick={() => handleButtonClick(weekNumber)}
            className={`bg-red-400 shadow-sm hover:bg-red-500 text-gray-100 font-semibold active:bg-red-600 focus:outline py-2 px-4 rounded m-2 flex-row flex-wrap items-center transition duration-200 ease-in-out ${
              week === weekNumber ? "bg-red-600" : ""
            }`}
          >
            Vecka {weekNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
