const list = document.querySelector('.data');
const addButton = document.getElementById('add');
const doubleButton = document.getElementById('double');
const showMillionButton = document.getElementById('million');
const sortButton = document.getElementById('sort');
const calcButton = document.getElementById('calc');

let listData = [];

//Get person data from RandomUser API
async function getUser() {
    try {
        const res = await fetch('https://randomuser.me/api/');
        const result = await res.json();

        const name = result.results[0].name.first + ' ' + result.results[0].name.last;
        const newUser = {
            name,
            wealth: Math.floor((Math.random()) * 3000000 )
        };
        addData(newUser);

    } catch (err) {
        alert(err);
    }    
};

//Add person object to data array
function addData(obj) {
    listData.push(obj);
    renderList();
};

//Format the wealth number as currency string
function formatWealth(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

//Display the list in UI with forEach()
function renderList(arr = listData) {

    list.innerHTML = '<h2 class="header"><strong>Person</strong> Wealth</h2>';

    arr.forEach(el => {
        const markup = `
            <div class="person">
            <strong>${el.name}</strong> $${formatWealth(el.wealth)}
            </div>`;
        list.insertAdjacentHTML('beforeend', markup);
    });  
};

//Double the wealth of each person with map()
function doubleWealth() {
    listData = listData.map(el => {
        return {...el, wealth: el.wealth * 2}
    });
    renderList();
};

//Sort list by richest with sort()
function sortByRichest() {
    listData.sort((a,b) => b.wealth - a.wealth);
    renderList();
};

//Show only millionaires with filter()
function showMillion() {
    listData = listData.filter(el => {
        return el.wealth > 1000000;
    });
    renderList();
};

//Calculate total wealth with reduce()
function sumWealth() {
    const total = listData.reduce((acc, cur) => {
        return acc + cur.wealth;
    }, 0);
   
    const markup = `
    <div class= "total">
        <p>The total wealth of listed people is <span>$${formatWealth(total)}</span></p>
    </div>`;
    

    list.insertAdjacentHTML('beforeend', markup);
};

//Event listeners
addButton.addEventListener('click', getUser);
doubleButton.addEventListener('click', doubleWealth);
sortButton.addEventListener('click',sortByRichest);
showMillionButton.addEventListener('click', showMillion);
calcButton.addEventListener('click', sumWealth);



