const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('mins');
const seconds = document.getElementById('secs');
const container = document.getElementById('container');
const loader = document.getElementById('loader');
const year = document.getElementById('year');

// Get the next year value
const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`01-01-${nextYear} 00:00:00 UTC+02:00`);
// Add the next year value to the DOM
year.innerText = nextYear;

// Count the time to New Year
function count() {
    const now = new Date();
    const difference = newYearTime - now;
    
    const d = Math.floor(difference / 1000 / 60 / 60 / 24);
    const h = Math.floor(difference / 1000 / 60 / 60)  % 24;
    const m = Math.floor(difference / 1000 / 60) % 60;
    const s = Math.floor(difference / 1000) % 60;
    updateUI(d, h, m, s);
};

// Update DOM with new values
function updateUI(d, h, m, s) {
    days.innerText = d;
    hours.innerText = h < 10 ? '0' + h : h;
    minutes.innerText = m < 10 ? '0' + m : m;
    seconds.innerText = s < 10 ? '0' + s : s;
};

// Remove spinner and display counter when counter data is ready
function whenDataReady() {
    loader.remove();
    container.style.display = 'flex';
    year.style.display = 'block';
};

setTimeout(whenDataReady, 1000);

// Update counter every second
setInterval(count, 1000);
