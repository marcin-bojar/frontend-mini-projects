const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

async function searchSongs(term) {
    const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
    const data = await res.json();
    
    // console.log(data);
    renderResults(data);
};

function renderResults(data) {

};

//Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();
    if (!searchTerm) {
        alert('Please enter title of the song or name of the artist...')
    } else {
        searchSongs(searchTerm);
    }
});