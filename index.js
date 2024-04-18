const COHORT = "2402-FTB-ET-WEB-PT";
const baseURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const eventForm = document.getElementById("form");
eventForm.addEventListener("submit", handleSubmit);

const eventsArray = {
  events: [],
};

const showCaseDOM = document.getElementById("showCase");

//a function that is called for the backend to make sure both function runs
async function viewEvents() {
  await showEvents();
  renderEvents();
}
viewEvents();

// this function will show the events raw data from the API
async function showEvents() {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    eventsArray.events = data.data;
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

// this will render each event in the array to the DOM
function renderEvents() {
  for (let i = 0; i < eventsArray.events.length; i++) {
    const element = eventsArray.events[i];
    console.log(element);
    const myDiv = document.createElement("div");

    myDiv.innerHTML = `
    <p>Name of event: ${element.name}</p>
    <p>Date of event: ${element.date}</p>
    <p>Description of event: ${element.description}</p>
    <p>Location of event: ${element.location}</p>
    <hr />
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Event";
    deleteButton.id = `${i}`; // assigns unique id to each button
    deleteButton.classList.add("deleteBtn");
    deleteButton.onclick = () => myDiv.remove();

    myDiv.appendChild(deleteButton);
    showCaseDOM.append(myDiv);
  }
}

//When the form is submitted, this will run
async function handleSubmit(e) {
  e.preventDefault();

  const nameInput = document.querySelector('input[name="name"]');
  const dateInput = document.querySelector('input[name="Date"]');
  const timeInput = document.querySelector('input[name="Time"]');
  const locationInput = document.querySelector('input[name="Location"]');
  const descriptionInput = document.querySelector('input[name="Description"]');

  const name = nameInput.value;
  const date = dateInput.value;
  const time = timeInput.value;
  const location = locationInput.value;
  const description = descriptionInput.value;

  console.log(name, date, time, location, description);

  try {
    const response = await fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, time, location, description }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event.");
    }
  } catch (error) {
    console.log(error.message);
  }

  const placeEvent = document.createElement("li");
  placeEvent.textContent = `${name}, Date: ${date}, Time: ${time}, Location: ${location}, Description: ${description}.`;
  document.getElementById("addedEvents").appendChild(placeEvent);
}
