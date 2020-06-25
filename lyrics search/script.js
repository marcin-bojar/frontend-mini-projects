const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const list = document.getElementById('list');

async function searchSongs(term) {
    try {
        const res = await fetch(`https://api.lyrics.ovh/suggest/${term}`);
        const data = await res.json();
        
        console.log(data);
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
            list.innerHTML = `${data.lyrics}`;
        }
    } catch(error) {
        alert(error);
    }
    
    
    
};

function parseTitle(title) {
    return title.replace(/'/g, '');
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
        ${data.next ? '<button class="btn">Next</button>' : ''}
        ${data.prev ? '<button class="btn">Prev</button>' : ''}
        `     
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