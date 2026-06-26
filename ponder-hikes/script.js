// Made by Adrian Hernandez
const hikes = [
  {
    name: "Bechler Falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description: "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls"
  },
  {
    name: "Teton Canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon."
  },
  {
    name: "Denanda Falls",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls"
  },
  {
    name: "Coffee Pot Rapids",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Coffee Pot Rapids",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description: "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids."
  },
  {
    name: "Menan Butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description: "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened."
  }
];

const hikeContainer = document.querySelector('#hike-container');
const input = document.querySelector('#search');
const button = document.querySelector('button');

function tagTemplate(tags) {
  return tags.map((tag) => `<button>${tag}</button>`).join(' ');
}

function difficultyTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5">Difficulty: `;
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true">🥾</span>`;
    } else {
      html += `<span aria-hidden="true">▫️</span>`;
    }
  }
  html += `</span>`;
  return html;
}

function hikesTemplate(hike) {
  return `<div class="hike-card">
  <div class="hike-content">
    <h2>${hike.name}</h2>
    <div class="hike-tags">
      ${tagTemplate(hike.tags)}
    </div>
    <p>${hike.description}</p>
    <p>${difficultyTemplate(hike.difficulty)}</p>
  </div>
</div>`;
}

function renderHike(hike) {
  hikeContainer.innerHTML += hikesTemplate(hike);
}

function compareDistance(a, b) {
  if (parseFloat(a.distance) < parseFloat(b.distance)) return -1;
  if (parseFloat(a.distance) > parseFloat(b.distance)) return 1;
  return 0;
}

function search() {
  const hikeQuery = input.value;

  const filteredHikes = hikes.filter(function (hike) {
    return (
      hike.name.toLowerCase().includes(hikeQuery.toLowerCase()) ||
      hike.description.toLowerCase().includes(hikeQuery.toLowerCase()) ||
      hike.tags.find((tag) => tag.toLowerCase().includes(hikeQuery.toLowerCase()))
    );
  });

  const sortedHikes = filteredHikes.sort(compareDistance);

  hikeContainer.innerHTML = '';

  sortedHikes.forEach(function (hike) {
    renderHike(hike);
  });
}

button.addEventListener('click', search);

input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    search();
  }
});

const randomNum = Math.floor(Math.random() * hikes.length);

function init() {
  renderHike(hikes[randomNum]);
}

init();