// Made by Adrian Hernandez
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('show');
  menuBtn.classList.toggle('change');
});