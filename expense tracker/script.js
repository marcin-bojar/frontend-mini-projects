const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const description = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');

const temporaryTransactions = [
    // {id:1, text: 'Fuel', amount: -80 },
    // {id:2, text: 'Salary', amount: 1080 },
    // {id:3, text: 'Food', amount: -189 },
    // {id:4, text: 'Lottery', amount: 180 },
    // {id:5, text: 'Rent', amount: -780.20 }
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
    item.setAttribute('data-id', `${transaction.id}`)
    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span><button class="delete-btn">X</button>
    `;

    list.appendChild(item);
};

// Calculate Budget balance, total income and total expense
function calcTotals() {
    data.totals.inc = data.transactions
        .filter( el => el.amount > 0)
        .reduce((acc, el) => acc += el.amount, 0);
   
    data.totals.exp = data.transactions
        .filter( el => el.amount < 0)
        .reduce((acc, el) => acc += el.amount, 0);

    data.budget = data.totals.inc - Math.abs(data.totals.exp);
};

// Render data values in UI
function displayTotals() {
    balance.innerText = `$${data.budget.toFixed(2)}`;
    income.innerText = `$${data.totals.inc.toFixed(2)}`;
    expense.innerText = `$${Math.abs(data.totals.exp).toFixed(2)}`;
};

function generateID() {
    return Math.floor(Math.random() * 100000000);
};

// Add transaction to data container and display in UI
function addTransaction(e) {
    let transaction;
    e.preventDefault();
    // Get input values
    if(description.value.trim() !== '' && amount.value.trim() !== '') {
        transaction = {
            id: generateID(),
            text: description.value,
            amount: parseFloat(amount.value)
        }
    }

    if(transaction) {
        // Add data to data container
        data.transactions.push(transaction);
        // Render new transaction
        addTransactionDOM(transaction);
        // Update values
        calcTotals();
        displayTotals();
        // Clear input
        description.value = '';
        amount.value = '';
    }
    
};

function removeTransaction(e) {

    if(e.target.classList.contains('delete-btn')) {
        // Get the id of transaction
        const ID = +e.target.parentNode.dataset.id;
        // Remove item from UI
        list.removeChild(e.target.parentNode);
        // Remove transaction from data container
        data.transactions = data.transactions.filter(el => el.id !== ID);
        // Update values and UI
        calcTotals();
        displayTotals();
    }
    
}

function init() {
    list.innerHTML = '';
    data.transactions.forEach(addTransactionDOM);
    calcTotals();
    displayTotals();
};

init();

// Event listeners
form.addEventListener('submit', addTransaction);
document.addEventListener('click', removeTransaction);