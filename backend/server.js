const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const snackData = require("./data/snackData.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.get("/api/snacks", (req, res) => {
  res.json(snackData.periodSnacks);
});

app.get("/api/mood", (req, res) => {
  res.json(snackData.moods);
});

app.get("/api/recommendations", (req, res) => {
  const { cycleDay, mood } = req.query;
  console.log(`Requested cycleDay: ${cycleDay}, mood: ${mood}`);
  if (!cycleDay || !mood) {
    return res.status(400).json({
      error: "Lägg till vilket hurmör du har och vilken cykeldag du är på",
    });
  }

  // Hämta rekommenderade kategorier baserat på dag och humör
  const recommendedCategories = [
    ...(snackData.cycleDayRecommendations[cycleDay]?.days || []),
    ...(snackData.moodRecommendations[mood] || []),
  ];

  // Välj unika snacks från de rekommenderade kategorierna
  const recommendations = recommendedCategories.flatMap((categoryId) => {
    const category = snackData.periodSnacks.categories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.snacks : [];
  });

  // Slumpar ett snack för att returnera
  const randomSnack =
    recommendations[Math.floor(Math.random() * recommendations.length)];
  res.json({ snack: randomSnack }); // Returnera ett slumpmässigt snack
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
