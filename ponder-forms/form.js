// Made by Adrian Hernandez
const form = document.querySelector("#fsyForm");
const travelRange = document.querySelector("#travelRange");
const notesContainer = document.querySelector("#notesContainer");
const notes = document.querySelector("#notes");
const output = document.querySelector("#output");
const campusBoxes = document.querySelectorAll('input[name="campus"]');

// Show/hide the travel notes
function updateNotesField() {
  const value = travelRange.value;
  if (value === "many") {
    notesContainer.hidden = false;
    notes.required = true;
  } else {
    notesContainer.hidden = true;
    notes.required = false;
    notes.value = ""; 
  }
}

travelRange.addEventListener("change", updateNotesField);
updateNotesField();

// Check if chosen date is in the past
function isPastDate(value) {
  const today = new Date();
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
  output.textContent = "";

  // Input values
  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const type = form.travelRange.value;
  const availableDate = form.availableDate.value;
  const selectedCampuses = getSelectedCampuses();
  const note = form.notes.value.trim();


  if (selectedCampuses.length === 0) {
    output.textContent = "Please select at least one campus you are willing to serve at.";
    return;
  }

  if (type === "many" && note === "") {
    output.textContent = "You selected 'Two or more campuses'. Please add travel notes explaining your flexibility. Chimmy Changa";
    return;
  }

  if (type === "many" && selectedCampuses.length < 2) {
    output.textContent = "You selected 'Two or more campuses' but only chose one. Please select at least two campuses. Pretty please with a cherry on top.";
    return;
  }

  if (isPastDate(availableDate)) {
    output.textContent = "Please choose a start date later than today. Bruh";
    return;
  }

  // ---- Success summary ----
  output.innerHTML = `
    <h2>Preference Submitted</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Availability: ${availableDate}</p>
    <p>Campuses: ${selectedCampuses.join(", ")}</p>
    <p>Preference Level: ${type === "one" ? "One campus" : "Two or more campuses"}</p>
    ${note ? `<p>Travel Notes: ${note}</p>` : ""}
  `;

  form.reset();
  updateNotesField();
});