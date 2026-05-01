/*
  Mission Statement Part 2 – Dark/Light Mode Toggle
  Programmed by: Adrian Hernandez
*/

let selectElem = document.getElementById('themeSelect');
let logo = document.getElementById('logo');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current === 'dark') {
        document.body.classList.add('dark');
        logo.src = 'byui-logo-white.webp';
    } else if (current === 'light') {
        document.body.classList.remove('dark');
        logo.src = 'byui-logo-blue.webp';
    }
}