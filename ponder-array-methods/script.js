// Made by Adrian Hernandez
const words = ['one', 'two', 'three'];

const students = [
  { last: 'Andrus',  first: 'Aaron'   },
  { last: 'Masa',    first: 'Manny'   },
  { last: 'Tanda',   first: 'Tamanda' }
];

// Render word list
const wordList = document.getElementById('word-list');
words.forEach(word => {
  const li = document.createElement('li');
  li.textContent = word;
  wordList.appendChild(li);
});

// Render student table
const table = document.getElementById('student-table');
students.forEach(student => {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.textContent = `${student.first} ${student.last}`;
  row.appendChild(cell);
  table.appendChild(row);
});