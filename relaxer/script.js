const text = document.getElementById('text');
const container = document.getElementById('container');
const btn = document.getElementById('btn');

const animationTime = 7500;
breatheTime = (animationTime / 5) * 2;
holdTime = animationTime / 5;

startRelax();
setInterval(startRelax, animationTime);


function startRelax() {
    container.classList.add('breathe');
    text.innerText = 'Breathe In!';
    setTimeout(() => {
        text.innerText = 'Hold!';
        setTimeout( () => text.innerText = 'Breathe Out!', holdTime)
    }, breatheTime);
};
