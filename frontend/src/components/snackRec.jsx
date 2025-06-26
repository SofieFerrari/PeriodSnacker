import React from "react";

export const SnackRec = ({ recommendations }) => {
  return (
    <div className="flex flex-col items-center self-center p-5 bg-gray-100 rounded-lg max-w-600 shadow-md">
      <h2 className="text-2xl font-bold font-atkinson mb-4">
        Du behöver nog lite:
      </h2>
      {recommendations.length > 0 ? (
        <ul>
          {recommendations.map((snack, index) => (
            <li
              key={index}
              className="text-black font-caprasimo text-5xl mb-2"
            >
              {snack}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};
