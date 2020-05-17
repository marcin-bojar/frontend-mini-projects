const searchField = document.getElementById('search');
const submit = document.querySelector('#submit');
const randomBtn = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const meals = document.getElementById('meals');
const single_meal = document.getElementById('single-meal');

async function searchMeals(e) {
    e.preventDefault();
    const search = searchField.value;
    
    if(search.trim()) {
       
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const result = await res.json();
            console.log(result);

            //Clear UI for new results
            clearUI();
    
            //Display search results
            if(result.meals === null) {
                resultHeading.innerHTML = `<h2>No results found for '${search}'. Try another meal.</h2>`;
            } else {
                resultHeading.innerHTML = `<h2>Search results for '${search}':</h2>`;
                result.meals.forEach(el => {
                    const markup = `
                    <div class="meal">
                        <figure class="meal-info" data-mealID="${el.idMeal}">
                            <img src="${el.strMealThumb}" alt="${el.strMeal}">
                            <h3 class="meal__title">${el.strMeal}</h3>
                        </figure>
                    </div>`
    
                meals.insertAdjacentHTML('beforeend', markup);          
                })      
            };       
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Please specify search query')
    }    

};

async function getMealById(id) {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const result = await res.json();
        const meal = result.meals[0];
    
        addMealToDOM(meal);
        window.location = '#single-meal';

    } catch(error) {
        console.log(error);
    }
};

async function getRandomMeal() { 
    clearUI();

    try {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const result = await res.json();
        const meal = result.meals[0];

        addMealToDOM(meal);

    } catch(error) {
        console.log(error);
    }
}

function addMealToDOM(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
       if(meal[`strIngredient${i}`]) {
           ingredients[i] = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
       } else {
           break;
       }
    }

    single_meal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="category">
                <h3>Category - ${meal.strCategory ? meal.strCategory : ''}</h3>
                <h3>Origin - ${meal.strArea ? meal.strArea : ''}</h3>
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul class="ingredients">
                    ${ingredients.map(el => `<li>${el}</li>`).join('')}          
                </ul>
            </div>
        </div>     
    `;
};

function clearUI() {
    searchField.value = '';
    resultHeading.innerHTML = '';
    meals.innerHTML = '';
    single_meal.innerHTML = '';
};

//Event listeners
submit.addEventListener('click', searchMeals);
search.addEventListener('kepressed', e => {
    if(e.target.keycode === 13 || e.target.which === 13)
        searchMeals();
});
meals.addEventListener('click', e => {
    e.path.forEach(el => {
        if(el.classList) {
            if (el.classList.contains('meal-info')) {
               const mealID = el.getAttribute('data-mealid');
                getMealById(mealID);
            }
        }       
    });
   
});
randomBtn.addEventListener('click', getRandomMeal);