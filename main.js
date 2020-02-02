const box    = document.querySelector('.box');
    
for (let i = 0; i < 100; i++) {
    const boxCell = document.createElement('div');
    boxCell.classList.add('box-cell');
    box.appendChild(boxCell);
}


    boxCells = box.querySelectorAll('.box-cell');

boxCells.forEach((cell) => {
    
    cell.addEventListener('click', () => {
        cell.style.background = '#334861';
        cell.style.borderColor = '#24344B';
        // cell.style.border = '0';
        // cell.style.width = '152px';
        // cell.style.height = '150px';
    });
});

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


