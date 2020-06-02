const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');

const temporaryTransactions = [
    {id:1, text: 'Fuel', amount: -80 },
    {id:2, text: 'Salary', amount: 1080 },
    {id:3, text: 'Food', amount: -189 },
    {id:4, text: 'Lottery', amount: 180 },
    {id:5, text: 'Rent', amount: -780.20 }
];

// Data container
const data = {
    transactions: temporaryTransactions,
    totals: {
        inc: 0,
        exp: 0
    },
    budget: 0          
};

// Add stored transactions to DOM
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');
    item.classList.add('list__item', transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span><button class="delete-btn">X</button>
    `;

    list.appendChild(item);
};

function calcTotals() {
    data.transactions.forEach( el => {
        el.amount > 0 ? data.totals.inc += el.amount : data.totals.exp += el.amount;
    });
    data.budget = data.totals.inc - Math.abs(data.totals.exp);
};

function displayTotals() {
    balance.innerText = `$${data.budget.toFixed(2)}`;
    income.innerText = `$${data.totals.inc.toFixed(2)}`;
    expense.innerText = `$${Math.abs(data.totals.exp).toFixed(2)}`;
};

function init() {
    list.innerHTML = '';
    data.transactions.forEach(addTransactionDOM);
    calcTotals();
    displayTotals();
};

init();