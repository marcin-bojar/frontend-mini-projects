const list = document.getElementById('list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const description = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// Data container
const data = {
    transactions: localStorage.getItem('transactions') !== null ? localStorageTransactions : [],
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

// Add transaction to data container and display in UI
function addTransaction(e) {
    let transaction;
    const id = manageID.generateID();
    e.preventDefault();
    // Get input values
    if(description.value.trim() !== '' && amount.value.trim() !== '' && id !== null)  {
        transaction = {
            id,
            text: description.value,
            amount: parseFloat(amount.value)
        }
    } else 
        transaction = null;

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
        updateLocalStorage();
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
        manageID.deleteID(ID);
        // Update values and UI
        calcTotals();
        displayTotals();
        updateLocalStorage();
    }   
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

// ID MANAGER
const manageID = (function() {
    // Closure used to store generated ID's
    let usedIDs = data.transactions.map(el => el.id);
    const limit = 1000;

    function generateID() {
            // Generate random ID
            let ID = Math.floor(Math.random() * limit);
            // Check if generated ID was already used
            if(usedIDs.includes(ID)) {
                // If all IDs were used inform user that list is full
                if(usedIDs.length >= limit)
                {
                    alert('List is full! Delete some items in order to be able to add new ones...');
                    ID = null;
                    return ID;
                // If IDs are still available keep generating new ID until unique number comes up    
                } else {
                    do {
                        ID = Math.floor(Math.random() * limit)
                    }
                    while (usedIDs.includes(ID));
                }  
            }

            usedIDs.push(ID);
            return ID;
    }

    function deleteID(id) {
       usedIDs = usedIDs.filter( el => el !== id);
    }

        return {
            generateID: generateID,
            deleteID: deleteID
        }
})();
    

// Save data in localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(data.transactions));
};

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