import React, { useState, useEffect } from "react";
import { MoodSelection } from "./components/moodSelector";
import { CycleWeekSelector } from "./components/cycleWeekSelector";
import { SnackRec } from "./components/snackRec";

const App = () => {
  const [cycleWeek, setCycleWeek] = useState(null);
  const [mood, setMood] = useState(null);
  const [moods, setMoods] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funktion för att hämta humördata
  const fetchMoods = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/mood");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMoods(data); // Sätt humördata
    } catch (err) {
      console.error(err);
      setError("Kunde inte hämta humördata.");
    }
  };

  // Fetching snacks recommendations based on cycleWeek and mood
  const fetchRecommendations = async () => {
    if (cycleWeek && mood) {
      setLoading(true);
      setError(null); // Nollställ eventuella tidigare fel

      try {
        const response = await fetch(
          `http://localhost:3000/api/recommendations?cycleWeek=${cycleWeek}&mood=${mood}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecommendations(data.snack ? [data.snack] : []); // Sätt rekommendationerna
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
  }, [cycleWeek, mood]);

  return (
    <div className="flex flex-col min-h-screen bg-red-100 p-10">
      <h1 className="text-3xl font-caprasimo self-center mb-20">
        Välkommen till Period-Snacker 🩸
      </h1>
      <CycleWeekSelector setCycleWeek={setCycleWeek} />
      <MoodSelection setMood={setMood} moods={moods} />

      {loading && <div>Laddar...</div>}
      {error && <div className="error">{error}</div>}

      <SnackRec recommendations={recommendations} />
    </div>
  );
};

export default App;
