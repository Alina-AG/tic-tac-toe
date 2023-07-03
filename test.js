const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const container = document.querySelector('.js-container');
const resetBtn = document.querySelector('.reset');

let historyX = [];
let historyO = [];
let player = 'X';

function createMarkup() {
    let markup = '';
    for (let i = 1; i < 10; i += 1) {
        markup += `<div class = "cell js-cell" data-id="${i} "></div>`;
    };
    container.innerHTML = markup;
};

createMarkup();

container.addEventListener('click', onClick);
resetBtn.addEventListener('click', onResetBtnClick);

function onClick(event) {
    
    const {target} = event;
    if (!target.classList.contains('js-cell') || target.textContent) {
        return;
    };

    
    target.textContent = player;

    let result = false;
    const id = Number(target.dataset.id);
    
    
    if (player === "X") {
        historyX.push(id);
        target.style.backgroundColor = '#fff52c';
        result = isWinner(historyX)
    } else {
        historyO.push(id);
        target.style.backgroundColor = '#3facff';
        result = isWinner(historyO)
    }
    
    if (result) {
        setTimeout(function(){
            alert(`Winner - player ${player}`);
        }, 200);
        container.removeEventListener('click', onClick);
        return;
    } else if (historyO.length + historyX.length === 9) {
        setTimeout(function(){
            alert('Try again!');
        }, 200);
        // onResetBtnClick();
    }
    player = player === "X" ? "O" : "X";
};

function isWinner(array) {
    return wins.some(item => item.every(id => array.includes(id)));
};

function onResetBtnClick() {

    historyX = [];
    historyO = [];
    player = 'X'
    createMarkup();
    container.addEventListener('click', onClick);
};