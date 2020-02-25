const modal    = document.querySelector('.choose-levels__modal'),
    playButton = document.querySelector('.play-button'),
    cancel     = modal.querySelector('.cancel');

playButton.addEventListener('click', () => {
    playButton.classList.add('hide');
    modal.classList.remove('hide');
});

cancel.addEventListener('click', () => {
    playButton.classList.remove('hide');
    modal.classList.add('hide');
});

