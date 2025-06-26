import React, { useState, useEffect } from "react";
import { ExpectedPeriodDate } from "./components/expectedPeriodDate";
import { MoodSelection } from "./components/moodSelector";
import { SnackRec } from "./components/snackRec";

const App = () => {
  const [cycleDay, setCycleDay] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState(null);
  const [moodList, setMoodList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // Funktion för att hämta humördata
  const fetchMoods = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/mood");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMoodList(data); // Sätt humördata
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta humördata.");
    }
  };

  // Fetching snacks recommendations based on cycleDay and mood
  const fetchRecommendations = async () => {
    if (cycleDay && mood) {
      setLoading(true);
      setError(null); // Nollställ eventuella tidigare fel
      setRecommendations([]); // Nollställ rekommendationer innan ny hämtning

      try {
        const response = await fetch(
          `http://localhost:3000/api/recommendations?cycleDay=${cycleDay}&mood=${mood}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecommendations(data.snack ? [data.snack] : []);
        console.log(
          `Hämtar rekommendationer för cykeldag ${cycleDay} och humör ${mood} och rekommenderar ${data.snack}`
        );
      } catch (err) {
        setError(
          "Kunde inte hämta rekommendationer. Kontrollera att backend-servern körs."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Använd useEffect för att hämta humördata vid komponentens laddning
  useEffect(() => {
    fetchMoods();
  }, []);

  // Använd useEffect för att anropa fetchRecommendations när cycleWeek eller mood ändras
  useEffect(() => {
    fetchRecommendations();
  }, [cycleDay, mood]);

  return (
    <div className="flex flex-col min-h-screen bg-red-100 p-10">
      <h1 className="text-3xl font-caprasimo self-center mb-20">
        Välkommen till Period-Snacker 🩸
      </h1>
      <ExpectedPeriodDate setCycleDay={setCycleDay} />
      <MoodSelection setMood={setMood} moods={moodList} />

      {loading && <div>Laddar...</div>}
      {error && <div className="error">{error}</div>}

      <SnackRec recommendations={recommendations} />
    </div>
  );
};

export default App;
