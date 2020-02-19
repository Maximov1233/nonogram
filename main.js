const box = document.querySelector('.box');

// addind cells into box

for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
}
const boxCells = box.querySelectorAll('.box-cell');
let current    = 'block';

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

const attemptsInGame = document.querySelectorAll('.heart');

for (let i = 0; i < 3; i++) {
    const heartClone = heart.cloneNode(true);
    attempts.appendChild(heartClone);
    const imgNotClickedClone = imgNotClicked.cloneNode(true);
    imgNotClickedClone.dataset.pos = i;
    heartClone.appendChild(imgNotClickedClone);
}



// giving coordinates

let trueArr = [
    0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,

];

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
    boxCells[i].dataset.reality = trueArr[i];
}

// click

const refresher = document.createElement('div');

refresher.classList.add('refresher');

boxCells.forEach((cell) => {
    if (cell.dataset.x == 5 && cell.dataset.y == 5) {
        cell.style.borderRight = '3px solid black';
        cell.style.borderBottom = '3px solid black';
        cell.style.zIndex = '99';
    } else if (cell.dataset.y == 5) {
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
                    if (cell.dataset.reality == '1') {
                        cell.style.background = '#334861';
                        cell.style.borderColor = '#24344B';
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
                        }, 2300);

                        if (counter === 2) {
                            setTimeout(() => {
                                alert('game over');
                            }, 3000);
                        }
                               
                    }

                } else if (current == 'cross') {
                    if (cell.dataset.reality == '0') {
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
                            const crossCellClone = crossCell.cloneNode(true);
                            cell.appendChild(crossCellClone);
                            cell.classList.add('hit');
                            cell.classList.remove('wrong-click');
                            counter++;
                            refresher.remove();  
                        }, 2300);

                        if (counter === 2) {
                            setTimeout(() => {
                                alert('game over');
                            }, 3000);
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

let numbersLeftArr = [],
    numbersTopArr = [],
    numbersLeftObj = {
        "1": "2",
        "2": "4",
        "3": "4",
        "4": "4 2",
        "5": "2 4 2",
        "6": "2 4 2",
        "7": "2 7",
        "8": "10",
        "9": "5",
        "10": "4"
    },
    numbersTopObj = {
        "1": "4",
        "2": "4",
        "3": "2",
        "4": "9",
        "5": "10",
        "6": "10",
        "7": "9",
        "8": "2",
        "9": "5",
        "10": "5"
    };

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