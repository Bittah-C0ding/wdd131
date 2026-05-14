// Made by Adrian Hernandez
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

function openModal(e) {
    let target = e.target;
    if (target.tagName !== 'IMG') {
        target = target.querySelector('img');
        if (!target) return;
    }
    const smallSrc = target.getAttribute('src');
    const largeSrc = smallSrc.replace('-sm.jpg', '-full.jpg');
    modalImage.setAttribute('src', largeSrc);
    modal.showModal();
}

gallery.addEventListener('click', openModal);

closeButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});