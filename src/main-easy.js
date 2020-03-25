import {
    cactusLevel
} from './levels.js';

const box = document.querySelector('.box');

// adding cells into box

for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.append(boxCell);
    boxCell.dataset.pos = i + 1;
}
const boxCells = box.querySelectorAll('.box-cell');

// adding switcher options

let current = 'block';

const cross   = document.querySelector('.cross-wrap'),
    block     = document.querySelector('.block-wrap'),
    hint      = document.querySelector('.hint'),
    hintSpan  = hint.querySelector('span'),
    switchers = [block, cross, hint],
    stickCell = document.createElement('div'),
    crossCell = document.createElement('div');

crossCell.classList.add('cross-cell');
stickCell.classList.add('stick-cell');

crossCell.appendChild(stickCell);
const stickCellClone = stickCell.cloneNode(true);
crossCell.appendChild(stickCellClone);

// adding attempts 

const attempts    = document.querySelector('.attempts'),
    imgNotClicked = document.createElement('img'),
    imgWrongClick = 'http://127.0.0.1:5501/img/heart.svg';

let counter = 0;

imgNotClicked.src = 'http://127.0.0.1:5501/img/like.svg';

const addingHearts = () => {
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const img = document.createElement('img');
        img.src = 'http://127.0.0.1:5501/img/like.svg';
        img.dataset.pos = i;
        heart.append(img);
        attempts.append(heart);
    }
}

addingHearts();

// adding numbers

const boxNumbersLeft = document.querySelector('.box-numbers__left'),
    boxNumbersTop = document.querySelector('.box-numbers__top'),
    boxNumber = document.createElement('div'),
    boxNumberText = document.createElement('p');

boxNumber.classList.add('box-number');

for (let i = 0; i < 10; i++) {
    const boxNumberClone = boxNumber.cloneNode(true);
    boxNumbersLeft.appendChild(boxNumberClone);
    const boxNumberTextClone = boxNumberText.cloneNode(true);
    boxNumberClone.appendChild(boxNumberTextClone);
}

for (let i = 0; i < 10; i++) {
    const boxNumberClone = boxNumber.cloneNode(true);
    boxNumbersTop.appendChild(boxNumberClone);
    const boxNumberTextClone = boxNumberText.cloneNode(true);
    boxNumberClone.appendChild(boxNumberTextClone);
}

// filling numbers

const numbersLeft = document.querySelectorAll('.box-numbers__left .box-number p'),
    numbersTop = document.querySelectorAll('.box-numbers__top .box-number p'),
    boxNumbers = document.querySelectorAll('.box-number');

for (let i = 0; i < numbersLeft.length; i++) {
    numbersLeft[i].dataset.pos = i + 1;
    for (let i = 0; i < numbersLeft.length; i++) {
        numbersLeft[i].innerHTML = cactusLevel.numbersLeft[i];
    }
}

for (let i = 0; i < numbersTop.length; i++) {
    numbersTop[i].dataset.pos = i + 1;
    for (let i = 0; i < numbersTop.length; i++) {
        numbersTop[i].innerHTML = cactusLevel.numbersTop[i];
    }
}

// giving coordinates

let x = 1,
    y = 1,
    line = 1;

for (let i = 0; i < boxCells.length; i++) {
    boxCells[i].dataset.x = x;
    boxCells[i].dataset.y = y;
    boxCells[i].dataset.line = line;
    x++;
    if (x === 11) {
        boxCells[i].dataset.line = line;
        line++;
        x = 1;
        boxCells[i].dataset.y = y;
        y++;
    }
}

const lineCheck = (cell) => {
    let x = cell.dataset.x,
        y = cell.dataset.y,
        arrX = [],
        arrY = [];

    for (let i = 0; i < boxCells.length; i++) {
        if (boxCells[i].dataset.y === y && boxCells[i].firstChild) {
            if (boxCells[i].firstChild.className === 'box-cell__block') {
                arrX.push(boxCells[i].firstChild);
            }
        }
    }

    for (let i = 0; i < boxCells.length; i++) {
        if (boxCells[i].dataset.x === x && boxCells[i].firstChild) {
            if (boxCells[i].firstChild.className === 'box-cell__block') {
                arrY.push(boxCells[i].firstChild);
            }
        }
    }

    // console.log(arrX);
    // console.log(arrY);

    const boxNumberSum = (str) => {
        let sum = 0,
            arr = [...str];
        if (str.length <= 2) {
            sum = str;
        } else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== ' ') {
                    sum += parseInt(arr[i]);
                }
            }
        }
        return sum;
    };

    if (arrX.length === parseInt(boxNumberSum(numbersLeft[y - 1].textContent))) {
        numbersLeft[y - 1].parentNode.classList.add('full-line');
    }
    if (arrY.length === parseInt(boxNumberSum(numbersTop[x - 1].textContent))) {
        numbersTop[x - 1].parentNode.classList.add('full-line');
    }
};

const refresher = document.createElement('div'),
    modal = document.querySelector('.game-over__modal');

refresher.classList.add('refresher');

let reality,
    hints = 10;

const boxCellBlock = (cell) => {
    const innerCell = document.createElement('div');
    innerCell.classList.add('box-cell__block');
    cell.classList.add('border');
    cell.append(innerCell);

    let cellLeft,
        cellRight,
        cellTop,
        cellBottom;

    for (let i = 0; i < boxCells.length - 1; i++) {
        if (parseInt(boxCells[i].dataset.pos) === parseInt(cell.dataset.pos) - 1 && boxCells[i].dataset.x !== '10') {
            cellLeft = boxCells[i];
        } else if (parseInt(boxCells[i].dataset.pos) === parseInt(cell.dataset.pos) + 1 && boxCells[i].dataset.x !== '1') {
            cellRight = boxCells[i];
        } else if (parseInt(boxCells[i].dataset.y) === parseInt(cell.dataset.y) - 1 && cell.dataset.y !== '1' && boxCells[i].dataset.x === cell.dataset.x) {
            cellTop = boxCells[i];
        } else if (parseInt(boxCells[i].dataset.y) === parseInt(cell.dataset.y) + 1 && cell.dataset.y !== '10' && boxCells[i].dataset.x === cell.dataset.x) {
            cellBottom = boxCells[i];
        }
    }

    if ((cellLeft && !cellLeft.classList.contains('hit'))) {
        cellLeft.classList.add('border-right');
    }
    if ((cellRight && !cellRight.classList.contains('hit'))) {
        cellRight.classList.add('border-left');
    }
    if ((cellTop && !cellTop.classList.contains('hit'))) {
        cellTop.classList.add('border-bottom');
    }
    if ((cellBottom && !cellBottom.classList.contains('hit'))) {
        cellBottom.classList.add('border-top');
    }

    cell.classList.add('hit');
};

const findingReality = (cell) => {
    for (let i = 0; i < cactusLevel.reality.length; i++) {
        if (cell.dataset.pos === (i + 1).toString()) {
            reality = cactusLevel.reality[i];
            break;
        }
    }
};

const crossCellBlock = (cell) => {
    const crossCellClone = crossCell.cloneNode(true);
    cell.appendChild(crossCellClone);
    cell.classList.add('hit');
};

const wrongClick = (cell, reality) => {
    document.body.appendChild(refresher);
    cell.classList.add('wrong-click');
    setTimeout(() => {
        const images = document.querySelectorAll('.heart img');
        for (let i = 0; i < images.length; i++) {
            if (images[i].dataset.pos == counter) {
                images[i].src = imgWrongClick;
            }
        }
        if (reality == box) {
            boxCellBlock(cell);
        } else {
            crossCellBlock(cell);
        }
        cell.classList.remove('wrong-click');
        counter++;
        refresher.remove();
    }, 1700);
};

const gameOver = () => {
    setTimeout(() => {
        modal.style.display = 'flex';
        modal.classList.add('game-over__animation');
        modal.style.opacity = '1';
    }, 2600);
};

// click

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

        if (counter !== 3) {
            if (!cell.classList.contains('hit')) {
                if (current === 'block') {
                    findingReality(cell);
                    if (reality === 1) {
                        boxCellBlock(cell);
                    } else {
                        wrongClick(cell, cross);
                        if (counter === 2) {
                            gameOver();
                        }
                    }
                } else if (current === 'cross') {
                    findingReality(cell);
                    if (reality === 0) {
                        crossCellBlock(cell);
                    } else {
                        wrongClick(cell, cross);
                        if (counter === 2) {
                            gameOver();
                        }
                    }
                } else if (current === 'hint') {
                    if (hints !== 0) {
                        findingReality(cell);
                        if (reality === 1) {
                            boxCellBlock(cell);
                        } else if (reality === 0) {
                            crossCellBlock(cell);
                        }
                        hints--;
                        hintSpan.innerHTML = hints;
                    } else {
                        alert('you are out of hints');
                    }
                }
                lineCheck(cell);
            }
        } else {
            alert('game over');
        }
    });
});

// hint 

hint.addEventListener('click', () => {
    for (let i = 0; i < switchers.length; i++) {
        switchers[i].classList.remove('bg-white');
    }
    hint.classList.add('bg-white');
    current = 'hint';
});

// switcher

block.classList.add('bg-white');

cross.addEventListener('click', () => {
    for (let i = 0; i < switchers.length; i++) {
        switchers[i].classList.remove('bg-white');
    }
    cross.classList.add('bg-white');
    current = 'cross';
});

block.addEventListener('click', () => {
    for (let i = 0; i < switchers.length; i++) {
        switchers[i].classList.remove('bg-white');
    }
    block.classList.add('bg-white');
    current = 'block';
});

// restart

const refreshFunc = () => {
    boxCells.forEach((cell) => {
        cell.className = 'box-cell';
        cell.removeAttribute('style');
        boxNumbers.forEach((box) => {
            box.classList.remove('full-line');
        });
        modal.classList.remove('game-over__animation');
        counter = 0;
        modal.style.opacity = '';
        modal.style.display = '';
        cell.textContent = '';
        attempts.textContent = '';
    });
};

const restart = document.querySelector('.restart-button');

restart.addEventListener('click', () => {
    refreshFunc();
    addingHearts();
});