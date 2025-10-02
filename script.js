//Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const teamLists = {
  water: document.getElementById("waterList"),
  zero: document.getElementById("zeroList"),
  power: document.getElementById("powerList"),
};

// Track attendance
let count = 0;
const maxCount = 50;

// Load count from localStorage if it exists
if (localStorage.getItem("attendeeCount")) {
  count = parseInt(localStorage.getItem("attendeeCount"));
  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
}

// Load team counters from localStorage
const teamIds = ["waterCount", "zeroCount", "powerCount"];
for (let i = 0; i < teamIds.length; i++) {
  const teamId = teamIds[i];
  const saved = localStorage.getItem(teamId);
  if (saved !== null) {
    document.getElementById(teamId).textContent = saved;
  }
}

// Load attendee lists from localStorage
for (let team in teamLists) {
  let savedList = localStorage.getItem(team + "List");
  if (savedList) {
    let attendees = JSON.parse(savedList);
    for (let i = 0; i < attendees.length; i++) {
      let li = document.createElement("li");
      li.textContent = attendees[i];
      teamLists[team].appendChild(li);
    }
  }
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();
  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Increment count
  count++;
  // Update attendee count display
  attendeeCount.textContent = count;

  // Update progress bar width
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";

  // Save count to localStorage
  localStorage.setItem("attendeeCount", count);

  // Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const newTeamCount = parseInt(teamCounter.textContent) + 1;
  teamCounter.textContent = newTeamCount;
  // Save team counter to localStorage
  localStorage.setItem(team + "Count", newTeamCount);

  // Add attendee name to the correct team list
  let li = document.createElement("li");
  li.textContent = name;
  teamLists[team].appendChild(li);

  // Save updated attendee list to localStorage
  let attendees = [];
  let listItems = teamLists[team].getElementsByTagName("li");
  for (let i = 0; i < listItems.length; i++) {
    attendees.push(listItems[i].textContent);
  }
  localStorage.setItem(team + "List", JSON.stringify(attendees));

  //Show welcome message
  const message = `🎉 Welcome, ${name} from ${teamName}`;
  console.log(message);
  greeting.textContent = message;
  greeting.style.display = "block";
  greeting.className = "success-message";

  form.reset();
});
