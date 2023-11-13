

const showTeams = async () => {
  let TeamsJSON = await getTeams(); 
  let teamsDiv = document.getElementById("nba-teams-div"); 

  if(TeamsJSON == "") {
    console.log("Invalid load of JSON"); 
    return; 
  }

  // teamsDiv.innerHTML = ""; 

  let num = 1; 

  TeamsJSON.forEach((team) => {
    const section = document.createElement("section"); 
    section.classList.add("team"); 

    // section.append(name); 

  //   const city = document.createElement("h3"); 
  //   city.innerHTML = team.city; 
  //   section.append(city);

  //   const arena = document.createElement("p"); 
  //   arena.innerHTML = "Arena Name: "+team.arena; 
  //   section.append(arena); 

  //   const bestPlayer = document.createElement("p"); 
  //   bestPlayer.innerHTML = "Best Player: "+team.bestPlayer; 
  //   section.append(bestPlayer); 

  //   const titlesWon = document.createElement("p"); 
  //   titlesWon.innerHTML = "Titles Won: "+team.titlesWon; 
  //   section.append(titlesWon); 

  //   const startersDiv = document.createElement("div"); 
  //   const startersDivTitle = document.createElement("h3"); 
  //   startersDivTitle.innerHTML = "Starting 5"; 
  //   startersDiv.append(startersDivTitle);

  //   let i = 1; 
  //   let position = "PG"; 
  //   team.starting5.forEach((player) => {
  //     if(i == 1) {
  //       position = "PG"
  //     } else if(i ==2) {
  //       position = "SG"; 
  //     } else if(i == 3) {
  //       position = "SF"; 
  //     } else if(i == 4) {
  //       position = "PF"; 
  //     } else {
  //       position = "C"
  //     }
  //     const thisPlayer = document.createElement("ul"); 
  //     thisPlayer.innerHTML = position + ": " + player; 
  //     i++; 
  //     startersDiv.append(thisPlayer);
  // });

  // startersDiv.classList.add("starting5list"); 
  // section.append(startersDiv); 

  const a = document.createElement("a"); 
  a.href = "#"; 
  section.append(a); 

  const name = document.createElement("h1"); 
  name.innerHTML = num+". "+team.name; 
  num++;
  a.append(name); 

  a.onclick = (e) => {
    e.preventDefault(); 
    display(team); 
  }

  teamsDiv.append(section); 
  



  // return section;

  });
};



const getTeams = async() => {
  try {
    return (await fetch("https://assignment14-242.onrender.com/api/nbateams")).json();
  } catch(error) {
    console.log("error retrieving render json"); 
    return ""; 
  }
};

const display = (team) => {
  const details = document.getElementById("displayTeam");
  details.innerHTML = ""; 
  // console.log(team.name);

  const h3 = document.createElement("h3"); 
  h3.innerHTML = team.name; 
  details.append(h3); 

  const city = document.createElement("p"); 
  city.innerHTML = team.city;
  details.append(city); 

  const arena = document.createElement("p"); 
  arena.innerHTML = team.arena; 
  details.append(arena); 

  const bestplayer = document.createElement("p"); 
  bestplayer.innerHTML = team.bestPlayer; 
  details.append(bestplayer);

  const titlesWon = document.createElement("p"); 
  titlesWon.innerHTML = team.titlesWon; 
  details.append(titlesWon); 

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
  details.append(startersDiv); 

};

const addEditTeam = async(e) => {
  e.preventDefault(); 
  const form = document.getElementById("add-edit-team-form"); 
  const formData = new FormData(form); 
  formData.append("staring5", getStarting5());
  let response; 

  // console.log("hello!"); 
  
  //new team
  if(form._id.value == -1) {
    formData.delete("_id"); 
    // formData.append("starting5", getStarting5());
    console.log(...formData);

    response = await fetch("/api/nbateams", {
      method:"POST", 
      body:formData,
    });
  }

  console.log(response.status);

  //if here- pull is successful 
  if(response.status != 200) {
    console.log("Error posting data"); 
  }

  response = await response.json(); 
  ResetForm(); 
  // document.querySelector(".dialog").classList.add("transparent"); 
  showTeams(); 
};

const getStarting5 = () => {
  //this works 
  const inputs = document.querySelectorAll("#player-boxes input");
  let players = []; 

  inputs.forEach((input) => {
    players.push(input.value); 
    // console.log(input.value); 
  });

  return players; 
};

const ResetForm = () => {
  const form = document.getElementById("add-edit-team-form"); 
  form.reset(); 
  form._id = "-1"; 
  document.getElementById("player-boxes").innerHTML = ""; 
};

const showHideAdd = (e) => {
  e.preventDefault(); 
  // document.querySelector(".dialog").classList.remove("transparent"); 
  document.getElementById("add-edit-title").innerHTML = "Add Team"; 
  ResetForm(); 
};

const addPlayer = (e) => {
  e.preventDefault(); 
  const section = document.getElementById("player-boxes"); 
  const input = document.createElement("input"); 
  input.type = "text"; 
  section.append(input); 
}

window.onload = () => {
  showTeams();
  document.getElementById("add-link").onclick = showHideAdd; 
  document.getElementById("add-edit-team-form").onsubmit = addEditTeam; 

  document.querySelector(".close").onclick = () => {
    document.querySelector(".dialog").classList.add("transparent");
  };

  document.getElementById("add-player").onclick = addPlayer; 
} 