// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// Fetching alerts for U.S 
const form = document.querySelector("#weather-form");
const input = document.querySelector("#state-input");
const alertsContainer = document.querySelector("#alerts-container");
const errorDiv = document.querySelector("#error-message");

// Fetch alerts
async function fetchWeatherAlerts(state) {
    try {
    // Clear previous UI
    alertsContainer.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.style.display = "none";

    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
        throw new Error("Invalid state code or failed request");
    }

    const data = await response.json();

    displayAlerts(data, state);
    input.value = ""; // Clear input
} catch (error) {
    displayError(error.message);
}
}

// Display alerts
function displayAlerts(data, state) {
const alerts = data.features;

const title = document.createElement("h2");
title.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
alertsContainer.appendChild(title);

const list = document.createElement("ul");

alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
});

alertsContainer.appendChild(list);
}

// Display error
function displayError(message) {
errorDiv.textContent = message;
errorDiv.style.display = "block";
}

// Handle form submit
form.addEventListener("submit", (e) => {
e.preventDefault();

const state = input.value.trim();

  // Input validation
if (!state || state.length !== 2 || state !== state.toUpperCase()) {
    displayError("Please enter a valid 2-letter state code (e.g., NY)");
    return;
}

fetchWeatherAlerts(state);
});
