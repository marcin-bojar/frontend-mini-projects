const checkBtn = document.getElementById('check');
const list = document.getElementById('list');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ];

const pipe = (f, g) => (...args) => g(f(...args));
const renderList = (...fns) => fns.reduce(pipe);

// Display shuffled list in UI
const generatedList = renderList(shuffleList, createList)(richestPeople);

function createList(arr) {
    const tempArr = [...arr];
    const newArr = [];
    
    tempArr.forEach((el, i) => {
        const listItem = document.createElement('li'); 
        listItem.setAttribute('data-index', i);

        listItem.innerHTML = `
            <span>${i + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person">${el}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        
        newArr.push(listItem);
        list.appendChild(listItem);
    });

    return newArr;
};

// Fisher-Yates shuffle
function shuffleList(arr) {
    let newArr = [...arr],
        n = arr.length,
        index,
        temp;

    // While there are unshuffled elements
    while(n) {
        index = Math.floor(Math.random() * n--)
        temp = newArr[n];
        newArr[n] = newArr[index];
        newArr[index] = temp;
    }

    return newArr;
};