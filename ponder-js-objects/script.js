// Made by Adrian Hernandez
const aCourse = {
  code: 'CSE121b',
  name: 'Javascript Language',
  logo: 'images/js-logo.png',
  sections: [
    { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T' },
    { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A' }
  ],
  enrollStudent: function (sectionNum) {
    // convert input to number
    const num = Number(sectionNum);
    // find the index of the section with that sectionNum
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum === num
    );
    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
    } else {
      alert(`Section ${sectionNum} not found. Please enter 1 or 2.`);
    }
  }
};

function sectionTemplate(section) {
  return `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td>
  </tr>`;
}

function renderSections(sections) {
  const html = sections.map(sectionTemplate);
  document.querySelector("#sections").innerHTML = html.join("");
}

// Display course name and code
document.querySelector("#courseName").textContent = aCourse.name;
document.querySelector("#courseCode").textContent = `Course Code: ${aCourse.code}`;

// Initial render of sections table
renderSections(aCourse.sections);

// Add event listener to the enroll button
document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = document.querySelector("#sectionNumber").value;
  if (sectionNum === "") {
    alert("Please enter a section number.");
    return;
  }
  aCourse.enrollStudent(sectionNum);
  // Clear input field after enrollment (optional)
  document.querySelector("#sectionNumber").value = "";
});