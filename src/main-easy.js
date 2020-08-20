import {
    cactusLevel
} from './levels.js';

// adding cells into box

const box = document.querySelector('.box');

for (let i = 0; i < cactusLevel.reality.length; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    boxCell.dataset.pos = i + 1;
    box.append(boxCell);
}

const boxCells = box.querySelectorAll('.box-cell'),
boxCellBlockHTML = '<div class="box-cell__block"></div>';

// adding switcher options

let current = 'block';

const cross = document.querySelector('.cross-wrap'),
    block = document.querySelector('.block-wrap'),
    hint = document.querySelector('.hint'),
    hintSpan = hint.querySelector('span'),
    switchers = [block, cross, hint];

block.classList.add('bg-white');

// adding attempts 

const attempts = document.querySelector('.attempts'),
    imgNotClicked = './img/like.svg',
    imgWrongClick = './img/heart.svg';

let counter = 0;

// adding numbers

const boxNumbersLeft = document.querySelector('.box-numbers__left'),
    boxNumbersTop = document.querySelector('.box-numbers__top');

for (let i = 0; i < cactusLevel.numbersLeft.length; i++) {
    const boxNumber = document.createElement('div'),
    boxNumberText = document.createElement('p');
    boxNumber.classList.add('box-number');
    boxNumber.append(boxNumberText);
    boxNumbersLeft.append(boxNumber);
}

for (let i = 0; i < cactusLevel.numbersTop.length; i++) {
    const boxNumber = document.createElement('div'),
    boxNumberText = document.createElement('p');
    boxNumber.classList.add('box-number');
    boxNumber.append(boxNumberText);
    boxNumbersTop.append(boxNumber);
}

// filling numbers

const numbersLeft = document.querySelectorAll('.box-numbers__left .box-number p'),
    numbersTop = document.querySelectorAll('.box-numbers__top .box-number p'),
    boxNumbers = document.querySelectorAll('.box-number');

for (let i = 0; i < numbersLeft.length; i++) {
    numbersLeft[i].dataset.pos = i + 1;
    numbersLeft[i].innerHTML = cactusLevel.numbersLeft[i];
}

for (let i = 0; i < numbersTop.length; i++) {
    numbersTop[i].dataset.pos = i + 1;
    numbersTop[i].innerHTML = cactusLevel.numbersTop[i];
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

const refresher = document.createElement('div'),
    modal = document.querySelector('.game-over__modal');

refresher.classList.add('refresher');

let reality,
    hints = 10;

const addingHearts = () => {
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const img = document.createElement('img');
        img.src = imgNotClicked;
        img.dataset.pos = i;
        heart.append(img);
        attempts.append(heart);
    }
};

const LineAnimation = (arr, coordinate, x, y) => {
    document.body.append(refresher);
    arr.reverse();
    for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
            arr[i].classList.add('box-animation');
        }, i * 25); 
        if (coordinate === 'vertical') {
            numbersLeft[y - 1].parentNode.classList.add('full-line');
        } else {
            numbersTop[x - 1].parentNode.classList.add('full-line');
        }  
        setTimeout(() => {
            refresher.remove();
            arr[i].classList.remove('box-animation');
        }, 600); 
    } 
};

const lineCheck = (cell) => {
    let x = cell.dataset.x,
        y = cell.dataset.y,
        arrX = [],
        arrY = [];

    for (let i = 0; i < boxCells.length; i++) {
        if (boxCells[i].dataset.y === y && boxCells[i].innerHTML === boxCellBlockHTML) {
            arrX.push(boxCells[i].firstChild);
        }
    }

    for (let i = 0; i < boxCells.length; i++) {
        if (boxCells[i].dataset.x === x && boxCells[i].innerHTML === boxCellBlockHTML) {
            arrY.push(boxCells[i].firstChild);
        }
    }

    //console.log(arrX);
    //console.log(arrY);

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
        LineAnimation(arrX, 'vertical', x, y);  
    }
    if (arrY.length === parseInt(boxNumberSum(numbersTop[x - 1].textContent))) {
        LineAnimation(arrY, 'horizontal', x, y); 
    }
};

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

    if ((cellLeft)) {
        cellLeft.classList.add('border-right');
    }
    if ((cellRight)) {
        cellRight.classList.add('border-left');
    }
    if ((cellTop)) {
        cellTop.classList.add('border-bottom');
    }
    if ((cellBottom)) {
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
    const crossCell = `
    <div class="cross-cell">
        <div class="stick-cell"></div>
        <div class="stick-cell"></div>
    </div>
    `;
    cell.innerHTML = crossCell;
    cell.classList.add('hit');
};

const easyLevelCrossAdding = () => {
    let crossArr = [];

    for (let i = 0; i < cactusLevel.reality.length; i++) {
        if (cactusLevel.reality[i] === 0) {
            crossArr.push(cactusLevel.reality.indexOf(0, i));
        }
    }
      
    const getRandomIntInclusive = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (boxCells[crossArr[number]].classList.contains('hit')) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;
            return number;
        } else {
            return number;
        }
    };
    
    for (let i = 0; i < 7; i++) {
        crossCellBlock(boxCells[crossArr[getRandomIntInclusive(0, crossArr.length - 1)]]); 
    }
}

easyLevelCrossAdding();

const wrongClick = (cell, reality) => {
    document.body.append(refresher);
    cell.classList.add('wrong-click');
    setTimeout(() => {
        const images = document.querySelectorAll('.heart img');
        for (let i = 0; i < images.length; i++) {
            if (parseInt(images[i].dataset.pos) === counter) {
                images[i].src = imgWrongClick;
            }
        }
        if (reality === box) {
            boxCellBlock(cell);
        } else {
            crossCellBlock(cell);
        }
        cell.classList.remove('wrong-click');
        counter++;
        refresher.remove();
    }, 1700);

    if (counter === 2) {
        setTimeout(() => {
            modal.classList.add('game-over__animation');
        }, 800);
    }
};

const refreshFunc = () => {
    boxCells.forEach((cell) => {
        cell.className = 'box-cell';
        cell.removeAttribute('style');
        boxNumbers.forEach((box) => {
            box.classList.remove('full-line');
        });
        modal.classList.remove('game-over__animation');
        counter = 0;
        cell.textContent = '';
        attempts.textContent = '';
    });
};

addingHearts();

// click

boxCells.forEach((cell) => {
    cell.addEventListener('click', () => {

        if (counter !== 3) {
            if (!cell.classList.contains('hit')) {
                if (current === 'block') {
                    findingReality(cell);
                    if (reality === 1) {
                        boxCellBlock(cell);
                        lineCheck(cell);
                    } else {
                        wrongClick(cell, cross);
                    }
                } else if (current === 'cross') {
                    findingReality(cell);
                    if (reality === 0) {
                        crossCellBlock(cell);
                    } else {
                        wrongClick(cell, box);
                    }
                } else if (current === 'hint') {
                    if (hints !== 0) {
                        findingReality(cell);
                        if (reality === 1) {
                            boxCellBlock(cell);
                            lineCheck(cell);
                        } else if (reality === 0) {
                            crossCellBlock(cell);
                        }
                        hints--;
                        hintSpan.innerHTML = hints;
                    } else {
                        alert('you are out of hints');
                    }
                }
            }
        } else {
            alert('game over');
        }
    });
});

// switcher

switchers.forEach((switcher) => {
    switcher.addEventListener('click', () => {
        for (let i = 0; i < switchers.length; i++) {
            switchers[i].classList.remove('bg-white');
        }
        switcher.classList.add('bg-white');
        switch (switcher) {
            case block:
                current = 'block';
                break;
            case cross:
                current = 'cross';
                break;
            case hint:
                current = 'hint';
                break;
        }
    });
});

// restart

const restart = document.querySelector('.restart-button');

restart.addEventListener('click', () => {
    refreshFunc();
    addingHearts();
});