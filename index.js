// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.querySelector("#state-input");
const button = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorDiv = document.querySelector("#error-message");

button.addEventListener("click", () => {
const state = input.value.trim();

  // Clear previous results
alertsDisplay.innerHTML = "";
errorDiv.textContent = "";
errorDiv.classList.add("hidden");

if (!state) {
    showError("Please enter a state code");
    return;
}

  fetch(weatherApi + state) // ✅ USING weatherApi correctly
    .then(res => {
    if (!res.ok) {
        throw new Error("Failed to fetch alerts");
    }
    return res.json();
    })
    .then(data => {
    const alerts = data.features;

      // Title
    const title = document.createElement("h2");
        title.textContent = `${data.title}: ${alerts.length}`;
        alertsDisplay.appendChild(title);

      // Headlines
    alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
    });

      input.value = ""; // clear input
    })
    .catch(error => {
        showError(error.message);
    });
});

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}