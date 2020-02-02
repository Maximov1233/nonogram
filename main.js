const box = document.querySelector('.box');

// addind cells into box
    
for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
}
const boxCells = box.querySelectorAll('.box-cell');
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

boxCells.forEach((cell) => {
    
    cell.addEventListener('click', () => {
        if (current === 'block') {
            cell.style.background = '#334861';
            cell.style.borderColor = '#24344B';
            console.log('a');
        } else if (current == 'cross') {
            const crossCellClone = crossCell.cloneNode(true);
            cell.appendChild(crossCellClone);
        }
    });
});

// giving coordinates

let x = 1,
    y = 1;

for (let i = 0; i < boxCells.length; i++) {
    boxCells[i].dataset.x = x;
    boxCells[i].dataset.y = y;
    x++;
    if (x === 6) {
        x = 1;
        boxCells[i].dataset.y = y;
        y++;
    }
}

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