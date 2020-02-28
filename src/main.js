import {realityObject, numbersTopObj, numbersLeftObj} from './levels.js';

const box = document.querySelector('.box');

// adding cells into box

for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
    boxCell.dataset.pos = i + 1;
}
const boxCells = box.querySelectorAll('.box-cell');

// adding switcher options

let current = 'block';

const cross   = document.querySelector('.cross-wrap'),
    block     = document.querySelector('.block-wrap'),
    stickCell = document.createElement('div'),
    crossCell = document.createElement('div');

crossCell.classList.add('cross-cell');
stickCell.classList.add('stick-cell');

crossCell.appendChild(stickCell);
const stickCellClone = stickCell.cloneNode(true);
crossCell.appendChild(stickCellClone);

// adding attempts 

const attempts    = document.querySelector('.attempts'),
    heart         = document.createElement('div'),
    imgNotClicked = document.createElement('img'),
    imgWrongClick = 'http://127.0.0.1:5500/img/heart.svg';

let counter = 0;

heart.classList.add('heart');

imgNotClicked.src = 'http://127.0.0.1:5500/img/like.svg';

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
    if (x === 11) {
        x = 1;
        boxCells[i].dataset.y = y;
        y++;
    }
}

// click

const refresher = document.createElement('div'),
    modal       = document.querySelector('.game-over__modal');

refresher.classList.add('refresher');

let reality;

boxCells.forEach((cell) => {
    if (cell.dataset.y == 10 && cell.dataset.x == 10) {
        cell.style.borderBottom = '3px solid black';
        cell.style.borderRight = 'unset';
        cell.style.zIndex = '99';
    } else if (cell.dataset.y == 5 && cell.dataset.x == 10) {
        cell.style.borderBottom = '3px solid black';
        cell.style.zIndex = '99';
        cell.style.borderRight = 'unset';
    } else if (cell.dataset.x == 5 && cell.dataset.y == 10) {
        cell.style.borderRight = '3px solid black';
        cell.style.zIndex = '99';
        cell.style.borderBottom = '3px solid black';
    } else if (cell.dataset.x == 10) {
        cell.style.borderRight = 'unset';
    } else if (cell.dataset.y == 10) {
        cell.style.borderBottom = '3px solid black';
        cell.style.zIndex = '99';
    }else if (cell.dataset.x == 5 && cell.dataset.y == 5) {
        cell.style.borderRight = '3px solid black';
        cell.style.borderBottom = '3px solid black';
        cell.style.zIndex = '99';
    }  else if (cell.dataset.y == 5) {
        cell.style.borderBottom = '3px solid black';
        cell.style.zIndex = '99';
    } else if (cell.dataset.x == 5) {
        cell.style.borderRight = '3px solid black';
        cell.style.zIndex = '99';
    } 
    cell.addEventListener('click', () => {

        if (counter !== 3) {
            if (!cell.classList.contains('hit')) {
                
                if (current === 'block') {
                    for (let key in realityObject) {
                        if (cell.dataset.pos == key) {
                            reality = realityObject[key];
                        }
                    }
                    if (reality == '1') {
                        cell.classList.add('box-cell__block');
                        if (cell.dataset.x == 5 && cell.dataset.y == 5) {
                            cell.style.borderRight = '3px solid black';
                            cell.style.borderBottom = '3px solid black';
                        } else if (cell.dataset.y == 5) {
                            cell.style.borderBottom = '3px solid black';
                        } else if (cell.dataset.x == 5) {
                            cell.style.borderRight = '3px solid black';
                        }
                        cell.classList.add('hit');
                    } else {
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
                        }, 1800);

                        if (counter === 2) {
                            setTimeout(() => {
                                modal.style.display = 'flex';
                                modal.classList.add('game-over__animation');
                                modal.style.opacity = '1';
                            }, 2800);
                        }        
                    }
                } else if (current == 'cross') {
                    for (let key in realityObject) {
                        if (cell.dataset.pos == key) {
                            reality = realityObject[key];
                        }
                    }
                    if (reality == '0') {
                        const crossCellClone = crossCell.cloneNode(true);
                        cell.appendChild(crossCellClone);
                        cell.classList.add('hit');
                    } else {
                        document.body.appendChild(refresher);
                        cell.classList.add('wrong-click');
                        setTimeout(() => {
                            const imagesInGame = document.querySelectorAll('.heart img');
                            for (let i = 0; i < imagesInGame.length; i++) {
                                if (imagesInGame[i].dataset.pos == counter) {
                                    imagesInGame[i].src = imgWrongClick;
                                }
                            }
                            cell.classList.add('.box-cell__block');
                            cell.classList.add('hit');
                            cell.classList.remove('wrong-click');
                            counter++;
                            refresher.remove();  
                        }, 1800);

                        if (counter === 2) {
                            setTimeout(() => {
                                modal.style.display = 'flex';
                                modal.classList.add('game-over__animation');
                                modal.style.opacity = '1';
                                
                            }, 2800);
                        }       
                    }
                }
            } 
        } else {
            alert('game over');
        }
    });
});

// switcher

block.style.background = '#fff';

cross.addEventListener('click', () => {
    cross.style.background = '#fff';
    block.style.background = '';
    current = 'cross';
});

block.addEventListener('click', () => {
    cross.style.background = '';
    block.style.background = '#fff';
    current = 'block';
});

// massive of numbers

const numbersLeft = document.querySelectorAll('.box-numbers__left .box-number p'),
    numbersTop = document.querySelectorAll('.box-numbers__top .box-number p');

// filling numbers

for (let i = 0; i < numbersLeft.length; i++) {
    numbersLeft[i].dataset.pos = i + 1;
    for (let key in numbersLeftObj) {
        if (numbersLeft[i].dataset.pos == key) {
            numbersLeft[i].innerHTML = numbersLeftObj[key];
        }
    }
}

for (let i = 0; i < numbersTop.length; i++) {
    numbersTop[i].dataset.pos = i + 1;
    for (let key in numbersTopObj) {
        if (numbersTop[i].dataset.pos == key) {
            numbersTop[i].innerHTML = numbersTopObj[key];
        }
    }
}

let j = 0;

const refreshFunc = () => {
    boxCells.forEach((cell) => {
        cell.className = 'box-cell';
        modal.classList.remove('game-over__animation');
        counter = 0;
        modal.style.opacity = '0';
        modal.style.display = '';
        if (cell.hasChildNodes()) {
            const crossCellClone = cell.querySelector('.cross-cell');   
            crossCellClone.parentNode.removeChild(crossCellClone);
        }
        const heart = document.querySelector('.heart');
        if (j !== 3) { 
            if (attempts.hasChildNodes()) {
                attempts.removeChild(heart);
                j++;
            }
        }
    });
};
const restart = document.querySelector('.restart-button');

restart.addEventListener('click', () => {
    refreshFunc();
    addingHearts();
});


