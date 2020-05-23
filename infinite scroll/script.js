const posts = document.querySelector('.posts-container');
const filter = document.getElementById('filter');
const loader = document.querySelector('.loader');

let limit = 3;
let page = 1;

async function getPosts() {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/1/posts?_limit=${limit}&_page=${page}`);
        const data = await res.json();
        return data;
    } catch(error) {
        console.log(error);
    } 
};

async function renderPosts() {
    try {
        console.log('Request');
        loader.classList.add('shown');
        const postsData = await getPosts();
        loader.classList.remove('shown');
        
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

renderPosts();

window.addEventListener('scroll', () => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    console.log(scrollHeight, scrollTop+clientHeight);
    if(scrollTop + clientHeight >= scrollHeight - 1) {
       page++;
       renderPosts();     
    }
});