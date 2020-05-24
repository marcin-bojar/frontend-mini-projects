const posts = document.querySelector('.posts-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');
let ready = true;   // flag for fetching new posts only once when user hits bottom of the page

let limit = 3;  // how many posts fetch in one request
let page = 1;   

//Fetch posts from API
async function getPosts() {
    try {
        console.log(`request for ${limit} posts starting on page ${page}`);
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
        const data = await res.json();
        return data;
    } catch(error) {
        console.log(error);
    } 
};

// Display posts in UI
async function renderPosts() {
    try {
        loader.classList.add('shown');
        const postsData = await getPosts();
        loader.classList.remove('shown');
        console.log(page);
        postsData.forEach(el => {
            
            const postEl = document.createElement('div');
            postEl.classList.add('post');
            postEl.innerHTML = `
                    <div class="post__number">${el.id}</div>
                    <div class="post__info">
                        <h2 class="post__title">${el.title}</h2>
                        <p class="post__body">${el.body}</p>
                    </div>  
                `;
            posts.appendChild(postEl);
        });
    } catch(error) {
        console.log(error);
    }   
};

// Check if user scrolled to the bottom of the page
function isAtBottom() {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
     
    if(scrollTop + clientHeight >= scrollHeight - 5) { 
        if(ready) {
            ready = false;
            page++;
            renderPosts();
        }
        
        // setTimeout prevents from multiple fetch requests when getting to bottom of page
        setTimeout(() => {
            ready = true;
        }, 100);        
    }   
};

// Filter posts by specifed term
function filterPosts(e) {
    const posts = document.querySelectorAll('.post');
    const term = e.target.value.toUpperCase();

    posts.forEach(el => {
        const title = el.querySelector('.post__title').innerText.toUpperCase();
        const body = el.querySelector('.post__body').innerText.toUpperCase();

        if(title.includes(term) || body.includes(term)) {
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
};

// Render initial posts
renderPosts();

// Event listeners
window.addEventListener('scroll', isAtBottom);
filter.addEventListener('input', filterPosts);