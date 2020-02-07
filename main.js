const box = document.querySelector('.box');

// addind cells into box

for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
}
const boxCells = box.querySelectorAll('.box-cell');
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

boxCells.forEach((cell) => {
    if (cell.dataset.x == 5 && cell.dataset.y == 5) {
        cell.style.borderRight = '3px solid black';
        cell.style.borderBottom = '3px solid black';
    } else if (cell.dataset.y == 5) {
        cell.style.borderBottom = '3px solid black';
    } else if (cell.dataset.x == 5) {
        cell.style.borderRight = '3px solid black';
    }
    cell.addEventListener('click', () => {
        if (!cell.classList.contains('clicked')) {
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
                    alert('wrong');
                    cell.classList.remove('clicked');
                }

            } else if (current == 'cross') {
                if (cell.dataset.reality == '0') {
                    const crossCellClone = crossCell.cloneNode(true);
                    cell.appendChild(crossCellClone);
                    cell.classList.add('hit');
                } else {
                    alert('wrong');
                    cell.classList.remove('clicked');
                }
            }
        }
        if (cell.classList.contains('hit')) {
            cell.classList.add('clicked');
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



console.log(trueArr);

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