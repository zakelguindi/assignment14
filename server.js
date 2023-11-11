const express = require("express"); 
const app = express(); 
app.use(express.static("public")); 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/nbateams", (req, res) => {
  const nbateams = []; 
  nbateams[0] = {
    name: "Philadelphia 76ers", 
    city: "Philadelphia, Pennsylvania", 
    arena: "Wells Fargo Center", 
    bestPlayer: "Joel Embiid", 
    titlesWon: 3, 
    starting5: ["Tyrese Maxey", "De'Anthony Melton", "Kelly Oubre Jr." ,"Tobias Harris", "Joel Embiid"]
  };
  nbateams[1] = {
    name: "Boston Celtics", 
    city: "Boston, Massachussetts", 
    arena: "TD Garden", 
    bestPlayer: "Jayson Tatum", 
    titlesWon: 17, 
    starting5: ["Jrue Holiday", "Derrick White", "Jaylen Brown", "Jayson Tatum", "Kristaps Porzingis"]
  }; 
  nbateams[2] = {
    name: "Los Angeles Lakers", 
    city: "Los Angeles, California", 
    arena: "Crypto.com Arena", 
    bestPlayer: "LeBron James", 
    titlesWon: 17, 
    starting5: ["D'Angelo Russell", "Gabe Vincent", "Austin Reaves", "LeBron James", "Anthony Davis"]
  }; 
  nbateams[3] = {
    name: "Miami Heat", 
    city: "Miami, Florida", 
    arena: "American Airlines Center", 
    bestPlayer: "Jimmy Butler", 
    titlesWon: 3, 
    starting5: ["Kyle Lowry", "Tyler Herro", "Jimmy Butler" ,"Haywood Highsmith", "Bam Adebayo"]
  };
  nbateams[4] = {
    name: "Chicago Bulls" , 
    city: "Chicago, Illinois", 
    arena: "United Center", 
    bestPlayer: "Zach LaVine", 
    titlesWon: 6, 
    starting5: ["Coby White", "Zach LaVine", "DeMar DeRozan" , "Torrey Craig", "Nikola Vucevic"]
  };
  nbateams[5] = {
    name: "Golden State Warriors", 
    city: "San Francisco, California", 
    arena: "Chase Center", 
    bestPlayer: "Steph Curry", 
    titlesWon: 4, 
    starting5: ["Steph Curry", "Klay Thompson", "Andrew Wiggins", "Draymond Green", "Kevon Looney"]
  };
  res.json(nbateams); 

});

app.listen(3000, () => {
  console.log("listening...");
});