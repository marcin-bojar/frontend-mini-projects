const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const list = document.getElementById('list');

// Search for songs or artists
async function searchSongs(term) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
        const data = await res.json();
        
        renderResults(data);
    } catch(error) {
        alert(error);
    }
    
};

// Get the lyrics of chosen song 
async function getSongLyrics(artist, title) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();
        if(!data.lyrics) {
            list.innerHTML = `${data.error}`;
            more.innerHTML = '';
        } else {
            list.innerHTML = `<div class="song-heading"><h2>${artist}</h2> - <span class="title">${title}</span></div>
            ${parseLyrics(data.lyrics)}`;
            more.innerHTML = '';
        }
    } catch(error) {
        alert(error);
    }
};

function parseTitle(title) {
    return title.replace(/'|"|`/g, '');
};

function parseLyrics(lyrics) {
    return lyrics.replace(/\r\n|\r|\n/g, '<br>');
};

// Get the list of next 15 songs from search query
async function getMoreSongs(url) {
    try {
        const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
        const data = await res.json();
        
        renderResults(data);
    } catch(error) {
        alert(error);
    }
};

// Display search results in UI
function renderResults(data) {
    // Clear previous search results
    list.innerHTML = '';
    
    let title;
    data.data.forEach(el => {
        title = parseTitle(el.title);
        
        const listItem = `
            <li class="songs-list__item" onclick = "getSongLyrics('${el.artist.name}', '${title}')">
            <h2>${el.artist.name}</h2> - <span class="title">${el.title}</span></li>
        `;

        list.insertAdjacentHTML('beforeend', listItem);
    });
    
    // If there is more songs found show next or/and prev pagination buttons 
    if(data.next || data.prev) {
        more.innerHTML = `
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        `;   
    } else {
        more.innerHTML = '';
    }
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