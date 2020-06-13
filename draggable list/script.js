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

let generatedList = [];

createList(richestPeople);

function createList(arr) {
    const newArr = shuffleList([...arr]);
    
    newArr.forEach((el, i) => {
        const listItem = document.createElement('li'); 
        listItem.setAttribute('data-index', i);

        listItem.innerHTML = `
            <span>${i + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person">${el}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        
        generatedList.push(listItem);
        list.appendChild(listItem);
    });
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
}