import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const ExpectedPeriodDate = ({ setCycleDay }) => {
  const [expectedDate, setExpectedDate] = useState(null);

  const handleDateChange = (date) => {
    setExpectedDate(date);

    if (date) {
      const today = new Date();
      const timeDifference = today.getTime() - date.getTime();
      const dayDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

      const cycleDay = dayDifference + 1;
      setCycleDay(cycleDay > 30 ? 30 : cycleDay);
    } else {
      setCycleDay(null);
    }
  };

  return (
    <div className="p-5 flex flex-col font-atkinson items-center mb-10">
      <h2 className="text-2xl text-center font-bold mb-4">
        Första mensens beräknade dag?
      </h2>
      <DatePicker
        selected={expectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="border bg-red-600 font-semibold text-center shadow-sm hover:bg-red-700 active:bg-red-600 focus:outline py-2 px-4 rounded m-2 transition duration-200 ease-in-out
 border-red-400 font-sans rounded text-gray-100 p-2 max-w-300"
        placeholderText="Välj ett datum"
      />
    </div>
  );
};
// bg-red-400
