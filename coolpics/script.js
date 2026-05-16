// Made by Adrian Hernandez
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
  menuBtn.classList.toggle('change');
});

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModalBtn = document.getElementById('closeModalBtn');
const galleryImages = document.querySelectorAll('.gallery-img');

const highResSrc = 'norris-full.jpg';

function openModal() {
  modalImage.src = highResSrc;
  modal.showModal();
}

galleryImages.forEach(img => {
  img.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.open) {
    modal.close();
  }
});