const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const list = document.getElementById('list');

async function searchSongs(term) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
        const data = await res.json();
        
        renderResults(data);
    } catch(error) {
        alert(error);
    }
    
};

async function getSongLyrics(artist, title) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await res.json();
        if(!data.lyrics) {
            list.innerHTML = `${data.error}`;
        } else {
            list.innerHTML = `<h2>${artist}</h2> - <span>${title}</span><br>
            ${parseLyrics(data.lyrics)}`;

            more.innerHTML = '';
        }
    } catch(error) {
        alert(error);
    }
};

function parseTitle(title) {
    return title.replace(/'/g, '');
};

function parseLyrics(lyrics) {
    return lyrics.replace(/\r\n|\r|\n/g, '<br>');
};

async function getMoreSongs(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        renderResults(data);
    } catch(error) {
        alert(error);
    }
};

function renderResults(data) {
    // Clear previous search results
    list.innerHTML = '';
    
    let title;
    data.data.forEach(el => {
        title = parseTitle(el.title);
        
        const listItem = `
            <li class="songs-list__item" onclick = "getSongLyrics('${el.artist.name}', '${title}')">${el.artist.name} - ${el.title}</li>
        `;

        list.insertAdjacentHTML('beforeend', listItem);
    });

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