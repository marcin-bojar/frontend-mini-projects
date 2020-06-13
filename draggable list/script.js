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

const generatedList = [];

createList(richestPeople);

function createList(arr) {
    const newArr = [...arr];
    
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