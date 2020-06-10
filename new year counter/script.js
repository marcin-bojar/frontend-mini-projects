const year = document.getElementById('year');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('mins');
const seconds = document.getElementById('secs');

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`01-01-${nextYear} 00:00:00 UTC+02:00`);
console.log(newYearTime);
year.innerText = nextYear;

function count() {
    const now = new Date();
    const difference = newYearTime - now;
    
    const d = Math.floor(difference / 1000 / 60 / 60 / 24);
    const h = Math.floor(difference / 1000 / 60 / 60)  % 24;
    const m = Math.floor(difference / 1000 / 60) % 60;
    const s = Math.floor(difference / 1000) % 60;
    updateUI(d, h, m, s);
};

function updateUI(d, h, m, s) {
    days.innerText = d;
    hours.innerText = h < 10 ? '0' + h : h;
    minutes.innerText = m < 10 ? '0' + m : m;
    seconds.innerText = s < 10 ? '0' + s : s;
};


setInterval(count, 1000);
