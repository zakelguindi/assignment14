

const showTeams = async () => {
  let TeamsJSON = await getTeams(); 
  let teamsDiv = document.getElementById("nba-teams-div"); 

  if(TeamsJSON == "") {
    console.log("Invalid load of JSON"); 
    return; 
  }

  let num = 1; 

  TeamsJSON.forEach((team) => {
    const section = document.createElement("section"); 
    section.classList.add("club"); 
    teamsDiv.append(section); 

    const name = document.createElement("h1"); 
    name.innerHTML = num+". "+team.name; 
    num++;
    section.append(name); 

    const city = document.createElement("h3"); 
    city.innerHTML = team.city; 
    section.append(city);

    const arena = document.createElement("p"); 
    arena.innerHTML = "Arena Name: "+team.arena; 
    section.append(arena); 

    const bestPlayer = document.createElement("p"); 
    bestPlayer.innerHTML = "Best Player: "+team.bestPlayer; 
    section.append(bestPlayer); 

    const titlesWon = document.createElement("p"); 
    titlesWon.innerHTML = "Titles Won: "+team.titlesWon; 
    section.append(titlesWon); 

    const startersDiv = document.createElement("div"); 
    const startersDivTitle = document.createElement("h3"); 
    startersDivTitle.innerHTML = "Starting 5"; 
    startersDiv.append(startersDivTitle);

    let i = 1; 
    let position = "PG"; 
    team.starting5.forEach((player) => {
      if(i == 1) {
        position = "PG"
      } else if(i ==2) {
        position = "SG"; 
      } else if(i == 3) {
        position = "SF"; 
      } else if(i == 4) {
        position = "PF"; 
      } else {
        position = "C"
      }
      const thisPlayer = document.createElement("ul"); 
      thisPlayer.innerHTML = position + ": " + player; 
      i++; 
      startersDiv.append(thisPlayer);
  });

  startersDiv.classList.add("starting5list"); 
  section.append(startersDiv); 

  return section;

  });
};

const getTeams = async() => {
  try {
    // return (await fetch("/api/nbateams")).json();
    return (await fetch("https://assignment14-242.onrender.com/api/nbateams")).json();
    // return (await fetch("http://localhost:3000/api/nbateams"));
  } catch(error) {
    console.log("error retrieving render json"); 
    return ""; 
  }
};

window.onload = () => showTeams(); 