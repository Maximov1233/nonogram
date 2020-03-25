// importing files

import {pokemonLevel} from './levels.js';

// adding cells into box

const box = document.querySelector('.box');

for (let i = 0; i < 225; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
    boxCell.dataset.pos = i + 1;
}
const boxCells = box.querySelectorAll('.box-cell');

// adding switcher options

let current = 'block';

const cross = document.querySelector('.cross-wrap'),
    block = document.querySelector('.block-wrap'),
    stickCell = document.createElement('div'),
    crossCell = document.createElement('div');

crossCell.classList.add('cross-cell');
stickCell.classList.add('stick-cell');

crossCell.appendChild(stickCell);
const stickCellClone = stickCell.cloneNode(true);
crossCell.appendChild(stickCellClone);

// adding attempts 

const attempts = document.querySelector('.attempts'),
    heart = document.createElement('div'),
    imgNotClicked = document.createElement('img'),
    imgWrongClick = 'http://127.0.0.1:5501/img/heart.svg';

let counter = 0;

heart.classList.add('heart');

imgNotClicked.src = 'http://127.0.0.1:5501/img/like.svg';

const addingHearts = () => {
    for (let i = 0; i < 3; i++) {
        const heartClone = heart.cloneNode(true);
        attempts.appendChild(heartClone);
        const imgNotClickedClone = imgNotClicked.cloneNode(true);
        imgNotClickedClone.dataset.pos = i;
        heartClone.appendChild(imgNotClickedClone);
    }
}

addingHearts();

// giving coordinates

let x = 1,
    y = 1;

for (let i = 0; i < boxCells.length; i++) {
    boxCells[i].dataset.x = x;
    boxCells[i].dataset.y = y;
    x++;
    if (x === 16) {
        x = 1;
        boxCells[i].dataset.y = y;
        y++;
    }
}

// click

const refresher = document.createElement('div'),
    modal = document.querySelector('.game-over__modal');

refresher.classList.add('refresher');

let reality,
hints = 10;

boxCells.forEach((cell) => {
    // if (cell.dataset.y == 10 && cell.dataset.x == 10) {
    //     cell.style.borderBottom = '3px solid black';
    //     cell.style.borderRight = 'unset';
    //     cell.style.zIndex = '99';
    // } else if (cell.dataset.y == 5 && cell.dataset.x == 10) {
    //     cell.style.borderBottom = '3px solid black';
    //     cell.style.zIndex = '99';
    //     cell.style.borderRight = 'unset';
    // } else if (cell.dataset.x == 5 && cell.dataset.y == 10) {
    //     cell.style.borderRight = '3px solid black';
    //     cell.style.zIndex = '99';
    //     cell.style.borderBottom = '3px solid black';
    // } else if (cell.dataset.x == 10) {
    //     cell.style.borderRight = 'unset';
    // } else if (cell.dataset.y == 10) {
    //     cell.style.borderBottom = '3px solid black';
    //     cell.style.zIndex = '99';
    // }else if (cell.dataset.x == 5 && cell.dataset.y == 5) {
    //     cell.style.borderRight = '3px solid black';
    //     cell.style.borderBottom = '3px solid black';
    //     cell.style.zIndex = '99';
    // }  else if (cell.dataset.y == 5) {
    //     cell.style.borderBottom = '3px solid black';
    //     cell.style.zIndex = '99';
    // } else if (cell.dataset.x == 5) {
    //     cell.style.borderRight = '3px solid black';
    //     cell.style.zIndex = '99';
    // } 
    cell.addEventListener('click', () => {
        console.log(current);
        if (counter !== 3) {
            if (!cell.classList.contains('hit')) {

                if (current === 'block') {
                    for (let i = 30; i < pokemonLevel.length + 30; i++) {
                        if (cell.dataset.pos == i - 29) {
                            reality = pokemonLevel[i];
                            console.log(reality);
                        }
                    }
                    if (reality == '1') {
                        cell.classList.add('box-cell__block');
                        // if (cell.dataset.x == 5 && cell.dataset.y == 5) {
                        //     cell.style.borderRight = '3px solid black';
                        //     cell.style.borderBottom = '3px solid black';
                        // } else if (cell.dataset.y == 5) {
                        //     cell.style.borderBottom = '3px solid black';
                        // } else if (cell.dataset.x == 5) {
                        //     cell.style.borderRight = '3px solid black';
                        // }
                        cell.classList.add('hit');
                    } else if (reality == '0') {
                        document.body.appendChild(refresher);
                        cell.classList.add('wrong-click');
                        setTimeout(() => {
                            const imagesInGame = document.querySelectorAll('.heart img');
                            for (let i = 0; i < imagesInGame.length; i++) {
                                if (imagesInGame[i].dataset.pos == counter) {
                                    imagesInGame[i].src = imgWrongClick;
                                }
                            }
                            const crossCellClone = crossCell.cloneNode(true);
                            cell.appendChild(crossCellClone);
                            cell.classList.add('hit');
                            cell.classList.remove('wrong-click');
                            counter++;
                            refresher.remove();
                        }, 1700);

                        if (counter === 2) {
                            setTimeout(() => {
                                modal.classList.remove('hide');
                                modal.classList.add('game-over__animation', 'op-1');
                            }, 2800);
                        }
                    }  else {
                        alert('invalid value of reality');
                    }
                } else if (current == 'cross') {
                    for (let i = 30; i < pokemonLevel.length + 30; i++) {
                        if (cell.dataset.pos == i - 29) {
                            reality = pokemonLevel[i];
                        }
                    }
                    if (reality == '0') {
                        const crossCellClone = crossCell.cloneNode(true);
                        cell.appendChild(crossCellClone);
                        cell.classList.add('hit');
                    } else if (reality == '1') {
                        document.body.appendChild(refresher);
                        cell.classList.add('wrong-click');
                        setTimeout(() => {
                            const imagesInGame = document.querySelectorAll('.heart img');
                            for (let i = 0; i < imagesInGame.length; i++) {
                                if (imagesInGame[i].dataset.pos == counter) {
                                    imagesInGame[i].src = imgWrongClick;
                                }
                            }
                            cell.classList.add('box-cell__block');
                            cell.classList.add('hit');
                            cell.classList.remove('wrong-click');
                            counter++;
                            refresher.remove();
                        }, 1800);

                        if (counter === 2) {
                            setTimeout(() => {
                                modal.classList.remove('hide');
                                modal.classList.add('game-over__animation', 'op-1');
                            }, 2800);
                        }
                    } else {
                        alert('invalid value of reality');
                    }
                } else if (current == 'hint') {
                    if (hints !== 0) {
                        for (let i = 30; i < pokemonLevel.length + 30; i++) {
                            if (cell.dataset.pos == i - 29) {
                                reality = pokemonLevel[i];
                            }
                        }
                        if (reality == '1') {
                            cell.classList.add('box-cell__block');
                        } else if (reality == '0') {
                            const crossCellClone = crossCell.cloneNode(true);
                            cell.appendChild(crossCellClone);
                            cell.classList.add('hit');
                        }
                        hints--;
                        hintSpan.innerHTML = hints;
                    }
                    else {
                        alert('you are out of hints');
                    }
                }
            }
        } else {
            alert('game over');
        }
    });
});

// hint 

const hint   = document.querySelector('.hint'),
    hintSpan = hint.querySelector('span'),

    refreshingVariants = () => {
    const variants = [block, cross, hint];
    variants.forEach((variant) => {
        variant.classList.remove('bg-white');
    });
};

hint.addEventListener('click', () => {
    refreshingVariants();
    hint.classList.add('bg-white');
    current = 'hint';
});

// switcher

block.classList.add('bg-white');

cross.addEventListener('click', () => {
    refreshingVariants();
    cross.classList.add('bg-white');
    current = 'cross';
});

block.addEventListener('click', () => {
    refreshingVariants();
    block.classList.add('bg-white');
    current = 'block';
});

// adding numbers

const boxNumbersLeft = document.querySelector('.box-numbers__left'),
    boxNumbersTop    = document.querySelector('.box-numbers__top'),
    boxNumber        = document.createElement('div'),
    boxNumberText    = document.createElement('p');

boxNumber.classList.add('box-number');

for (let i = 0; i < 15; i++) {
    const boxNumberClone   = boxNumber.cloneNode(true),
        boxNumberTextClone = boxNumberText.cloneNode(true);
    boxNumbersLeft.appendChild(boxNumberClone);
    boxNumberClone.appendChild(boxNumberTextClone);
}

for (let i = 0; i < 15; i++) {
    const boxNumberClone   = boxNumber.cloneNode(true),
        boxNumberTextClone = boxNumberText.cloneNode(true);
    boxNumbersTop.appendChild(boxNumberClone);
    boxNumberClone.appendChild(boxNumberTextClone);
}

// filling numbers

const numbersLeft = document.querySelectorAll('.box-numbers__left .box-number p'),
    numbersTop    = document.querySelectorAll('.box-numbers__top .box-number p');

for (let i = 0; i < numbersLeft.length; i++) {
    numbersLeft[i].dataset.pos = i + 1;
    for (let i = 0; i < 15; i++) {
        numbersLeft[i].innerHTML = pokemonLevel[i];
    }
}

for (let i = 0; i < numbersTop.length; i++) {
    numbersTop[i].dataset.pos = i + 1;
    for (let i = 15; i < 30; i++) {
        numbersTop[i - 15].innerHTML = pokemonLevel[i];
    }
}

// restart

const restart = document.querySelector('.restart-button'),

  refreshFunc = () => {
    boxCells.forEach((cell) => {
        cell.className = 'box-cell';
        modal.className = 'game-over__modal hide';
        counter = 0;
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }

        while (attempts.firstChild) {
            attempts.removeChild(attempts.firstChild);
        }
    });
};

restart.addEventListener('click', () => {
    refreshFunc();
    addingHearts();
});