const posts = document.querySelector('.posts-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');
let ready = true;   //flag for fetching new posts only once when user hits bottom of the page

let limit = 3;
let page = 1;

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

function isAtBottom() {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
     
    if(scrollTop + clientHeight >= scrollHeight - 5) { 
        if(ready) {
            ready = false;
            page++;
            renderPosts();
        }
            
        setTimeout(() => {
            ready = true;
        }, 100);        
    }   
};

//Render initial posts
renderPosts();

//Event listeners
window.addEventListener('scroll', isAtBottom);