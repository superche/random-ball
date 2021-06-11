const isDebug = true;
const isDarkMode = localStorage.getItem('pref-theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches;

const SIZE = 200;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const options = (() => {
    const lightTheme = {
        background: "white",
        strokeStyle: "rgba(0,0,0,0.15)"
    };
    const darkTheme = {
        background: "black",
        strokeStyle: "rgba(255,255,255,0.15)"
    };

    return {
        drawTimes: 3000,
        drawIntervalMs: undefined, // 100,
        theme: isDarkMode ? darkTheme : lightTheme
    };
})();

function randomLine() {
    const radius = SIZE;

    const angle1 = Math.random() * 2 * Math.PI;
    const x1 = radius + radius * Math.cos(angle1);
    const y1 = radius + radius * Math.sin(angle1);

    const angle2 = Math.random() * 2 * Math.PI;
    const x2 = radius + radius * Math.cos(angle2);
    const y2 = radius + radius * Math.sin(angle2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function setupStyle() {
    if (isDarkMode) {
        window.document.body.classList.add('dark')
    }
}

function setupCanvas() {
    canvas.width = 2* SIZE;
    canvas.height = 2* SIZE;
    ctx.fillStyle = options.theme.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = options.theme.strokeStyle;
}

function draw(cb) {
    const TIMES = options.drawTimes;
    const intervalMs = options.drawIntervalMs;
    let counter = 0;
    let interval = setInterval(() => {
        if (counter >= TIMES) {
            clearInterval(interval);
            interval = null;
            return;
        }
        counter++;
        debug(counter);
        cb();
    }, intervalMs);
}

function debug(counter) {
    if (!isDebug) return;
    document.getElementById("debug").innerHTML = `lines: ${counter}`;
}

function main() {
    setupStyle();
    setupCanvas();
    draw(randomLine);
}

window.onload = main;
