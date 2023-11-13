const express = require("express"); 
const app = express(); 
const Joi = require("joi"); 
const multer = require("multer"); 
app.use(express.static("public")); 
app.use(express.json()); 
const cors = require("cors"); 
app.use(cors()); 

// const upload = multer({ dest: __dirname + "/public/images"});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/api/nbateams", (req, res) => {
  let nbateams = []; 
  nbateams[0] = {
    _id:1,
    name: "Philadelphia 76ers", 
    city: "Philadelphia, Pennsylvania", 
    arena: "Wells Fargo Center", 
    bestPlayer: "Joel Embiid", 
    titlesWon: 3, 
    starting5: ["Tyrese Maxey", "De'Anthony Melton", "Kelly Oubre Jr." ,"Tobias Harris", "Joel Embiid"]
  };
  nbateams[1] = {
    _id:2,
    name: "Boston Celtics", 
    city: "Boston, Massachussetts", 
    arena: "TD Garden", 
    bestPlayer: "Jayson Tatum", 
    titlesWon: 17, 
    starting5: ["Jrue Holiday", "Derrick White", "Jaylen Brown", "Jayson Tatum", "Kristaps Porzingis"]
  }; 
  nbateams[2] = {
    _id:3,
    name: "Los Angeles Lakers", 
    city: "Los Angeles, California", 
    arena: "Crypto.com Arena", 
    bestPlayer: "LeBron James", 
    titlesWon: 17, 
    starting5: ["D'Angelo Russell", "Gabe Vincent", "Austin Reaves", "LeBron James", "Anthony Davis"]
  }; 
  nbateams[3] = {
    _id:4,
    name: "Miami Heat", 
    city: "Miami, Florida", 
    arena: "American Airlines Center", 
    bestPlayer: "Jimmy Butler", 
    titlesWon: 3, 
    starting5: ["Kyle Lowry", "Tyler Herro", "Jimmy Butler" ,"Haywood Highsmith", "Bam Adebayo"]
  };
  nbateams[4] = {
    _id:5,
    name: "Chicago Bulls" , 
    city: "Chicago, Illinois", 
    arena: "United Center", 
    bestPlayer: "Zach LaVine", 
    titlesWon: 6, 
    starting5: ["Coby White", "Zach LaVine", "DeMar DeRozan" , "Torrey Craig", "Nikola Vucevic"]
  };
  nbateams[5] = {
    _id:6,
    name: "Golden State Warriors", 
    city: "San Francisco, California", 
    arena: "Chase Center", 
    bestPlayer: "Steph Curry", 
    titlesWon: 4, 
    starting5: ["Steph Curry", "Klay Thompson", "Andrew Wiggins", "Draymond Green", "Kevon Looney"]
  };
  // res.json(nbateams); 

// });

app.get("/api/nbateams", (req, res) => {
  res.send(nbateams); 
});

app.post("/api/nbateams", (req, res) => {
  const result = validateTeam(req.body); 
  
  if(result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const team = {
    _id: nbateams.length + 1,
    name: req.body.name,
    city: req.body.city, 
    arena: req.body.arena,
    bestPlayer: req.body.bestPlayer, 
    titlesWon: req.body.titlesWon, 
    starting5: req.body.starting5
  };

  nbateams.push(team); 
  res.send(nbateams); 
});

const validateTeam = (team) => {
  const schema = Joi.object({
    _id: Joi.allow(""), 
    name: Joi.allow(""), 
    city: Joi.allow(""), 
    arena: Joi.allow(""), 
    bestPlayer: Joi.allow(""), 
    titlesWon: Joi.allow(""),
    starting5: Joi.allow(),
  });

  return schema.validate(team); 
};

app.listen(3000, () => {
  console.log("listening...");
});