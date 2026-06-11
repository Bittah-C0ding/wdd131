// Made by Adrian Hernandez – Character Card with Revive button
const character = {
  name: 'Bjorn Ironhide',
  class: 'Nord Warrior',
  level: 5,
  health: 100,
  image: 'nord-warrior.webp',

  attacked() {
    if (this.health <= 0) return; // already dead
    const damage = 20;
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      updateStatsDisplay();
      alert('💀 The warrior has fallen in battle! 💀');
      document.getElementById('attackBtn').disabled = true;
      document.getElementById('reviveBtn').style.display = 'inline-block';
    } else {
      updateStatsDisplay();
    }
  },

  levelUp() {
    if (this.health <= 0) {
      alert('Cannot level up – character is dead. Revive first.');
      return;
    }
    this.level += 1;
    updateStatsDisplay();
  },

  revive() {
    this.health = 100;
    updateStatsDisplay();
    document.getElementById('attackBtn').disabled = false;
    document.getElementById('reviveBtn').style.display = 'none';
    alert('The warrior rises again with full health!');
  }
};

// Get DOM elements
const nameSpan = document.getElementById('charName');
const classSpan = document.getElementById('charClass');
const levelSpan = document.getElementById('charLevel');
const healthSpan = document.getElementById('charHealth');

function updateStatsDisplay() {
  nameSpan.textContent = character.name;
  classSpan.textContent = character.class;
  levelSpan.textContent = character.level;
  healthSpan.textContent = character.health;
}

// Initial render
updateStatsDisplay();

// Event listeners
document.getElementById('attackBtn').addEventListener('click', () => {
  character.attacked();
});

document.getElementById('levelUpBtn').addEventListener('click', () => {
  character.levelUp();
});

document.getElementById('reviveBtn').addEventListener('click', () => {
  character.revive();
});