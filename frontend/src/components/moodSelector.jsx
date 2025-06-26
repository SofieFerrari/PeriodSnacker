import { useState } from "react";
import moodsData from "../../../backend/data/snackData.json";

export const MoodSelection = ({ setMood }) => {
  const [activeMood, setActiveMood] = useState(null); // Håller reda på vilket humör som är aktivt

  const handleClick = (moodId) => {
    setActiveMood(moodId); // Sätta det aktiva humöret
    setMood(moodId); // Skicka humöret uppåt till föräldern
  };

  return (
    <div className="p-5 font-atkinson self-center mb-10">
      <h2 className="text-2xl text-center font-bold mb-4">Välj ditt humör</h2>
      <div className="flex flex-wrap">
        {moodsData.moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleClick(mood.id)}
            className={`bg-red-400 shadow-sm hover:bg-red-500 text-gray-100 font-semibold active:bg-red-600 focus:outline py-2 px-4 rounded m-2 flex items-center transition duration-200 ease-in-out ${
              activeMood === mood.id ? "bg-red-600" : ""
            }`}
          >
            <span className="mr-2">{mood.emoji}</span>
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
};
