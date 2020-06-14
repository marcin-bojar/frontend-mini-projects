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

const dragManager = (function() {
    let dragStartIndex;
    let dragEndIndex;

    function dragStart() {
        // console.log('start');
        dragStartIndex = this.closest('li').getAttribute('data-index');   
    };

    function drop() {
        // console.log('end');
        dragEndIndex = this.closest('li').getAttribute('data-index');
        generatedListElements = swapListElements(dragStartIndex, dragEndIndex, generatedListElements);
        this.classList.remove('over');
    };

    function dragEnter() {
        // console.log('enter');
        this.classList.add('over');
    };

    function dragLeave() {
        // console.log('leave');
        this.classList.remove('over');
    };

    function dragOver(e) {
        // console.log('over');
        e.preventDefault();
        // this.classList.add('over');
    };

    return {
        dragStart: dragStart,
        drop: drop,
        dragEnter: dragEnter,
        dragLeave: dragLeave,
        dragOver: dragOver
    }
})();

// Display shuffled list in UI
let generatedListElements = renderList(shuffleList, createList)(richestPeople);

function createList(arr) {
    const tempArr = [...arr];
    const newArr = [];
    
    tempArr.forEach((el, i) => {
        const listItem = document.createElement('li'); 
        listItem.className = 'list__item';
        listItem.setAttribute('data-index', i);

        listItem.innerHTML = `
            <span>${i + 1}</span>
            <div class="draggable" draggable="true">
                <p class="list__person">${el}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        
        newArr.push(listItem);
        list.appendChild(listItem);
        addEventListeners();
    });

    return newArr;
};

// Fisher-Yates shuffle
function shuffleList(arr) {
    let newArr = [...arr],
        n = newArr.length,
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

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(el => {
        el.addEventListener('dragstart', dragManager.dragStart);
        el.addEventListener('drop', dragManager.drop);
        el.addEventListener('dragenter', dragManager.dragEnter);
        el.addEventListener('dragleave', dragManager.dragLeave);
        el.addEventListener('dragover', dragManager.dragOver);
    });
};

function swapListElements(fromIndex, toIndex, elemArr) {
    const newElemArr = [...elemArr];
    const itemOne = newElemArr[fromIndex].querySelector('.draggable');
    const itemTwo = newElemArr[toIndex].querySelector('.draggable');

    newElemArr[fromIndex].appendChild(itemTwo);
    newElemArr[toIndex].appendChild(itemOne);
    
    return newElemArr;
};

function checkOrder() {
    generatedListElements.forEach((el, i) => {
        el.className = 'list__item';
        const name = el.querySelector('.list__person').innerText.trim();
        richestPeople[i] === name ? el.classList.add('right') : el.classList.add('wrong');
    })
};

checkBtn.addEventListener('click', checkOrder);