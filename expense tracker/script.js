const list = document.getElementById('list');

const temporaryTransactions = [
    {id:1, text: 'Fuel', amount: -80 },
    {id:2, text: 'Salary', amount: 1080 },
    {id:3, text: 'Food', amount: -189 },
    {id:4, text: 'Lottery', amount: 180 }
];

// Add stored transactions to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add('list__item', transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn">X</button>
    `;

    list.appendChild(item);
};

function init() {
    list.innerHTML = '';
    temporaryTransactions.forEach(addTransactionDOM);
};

init();