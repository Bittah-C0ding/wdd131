// Made by Adrian Hernandez
const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

// Show/hide the travel notes field based on "many" selection
function updateNotesField() {
  const value = travelRange.value;
  if (value === "many") {
    notesContainer.hidden = false;
    notes.required = true;
  } else {
    notesContainer.hidden = true;
    notes.required = false;
    notes.value = ""; // clear any previous note
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField(); // initial call

// Check if chosen date is in the past
function isPastDate(value) {
  const today = new Date();
  // reset time to midnight for accurate comparison
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(value);
  chosen.setHours(0, 0, 0, 0);
  return chosen < today;
}

// Get array of selected campus values
function getSelectedCampuses() {
  return Array.from(campusBoxes)
    .filter(box => box.checked)
    .map(box => box.value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  output.textContent = ""; // clear previous output

  // Trim input values
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();

  // ---- Validation 1: at least one campus selected ----
  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus you are willing to serve at.";
    return;
  }

  // ---- Validation 2: if "many" campuses, must have a note ----
  if (type === "many" && note === "") {
    output.textContent = "You selected 'Two or more campuses'. Please add travel notes explaining your flexibility.";
    return;
  }

  // ---- Validation 3: if "many" campuses, must select at least two campuses ----
  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "You selected 'Two or more campuses' but only chose one. Please select at least two campuses.";
    return;
  }

  // ---- Validation 4: date must be future (not past) ----
  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a start date later than today.";
    return;
  }

  // ---- If all valid, show success summary ----
  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Availability: ${availableDate}</p>
    <p>Campuses: ${selectedCampuses.join(", ")}</p>
    <p>Preference Level: ${type === "one" ? "One campus" : "Two or more campuses"}</p>
    ${note ? `<p>Travel Notes: ${note}</p>` : ""}
  `;

  // Reset the form, then manually update notes field visibility and clear any leftover state
  form.reset();
  updateNotesField();
});