
const paths = [
    "balls",
    "boxes",
    "cacti",
    "cells",
    "cubes",
    "drip",
    "exclusion",
    "fireflies",
    "flower",
    "graph",
    "grid",
    "mandala",
    "mandala3D",
    "orb",
    "rainbow",
    "sin",
    "swarm",
    "tiedye",
    "tiles",
    "void",
    "wave",
    "wiggles",
    "random",
];
setInterval(() => {
    if (isArtPage()) {
        choosePage();
    }
}, 3600000);

setInterval(() => {
    let d = new Date();
    console.log("checking")
    if (d.getHours() === 0 && isArtPage()) {
        location.href = `../sleep.html`
    }
}, 60000);

setInterval(() => {
    let d = new Date();
    console.log(d.getHours())
    if (d.getHours() === 10 && !isArtPage()) {
        choosePage(true);
    }
}, 10000);

document.addEventListener('keyup', (e) => {
    console.log(e.code)
    if (e.code === "Digit2") {
        location.href = `../home.html`
    } else if (["Digit3", "Digit4"].includes(e.code)) {
        choosePage();
    }

});

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]


const choosePage = (sleep) => {
    let randomPath
    do {
        randomPath = ranChoice(paths)
    } while (location.href.includes(randomPath))
    location.href = `${sleep ? "." : ".."}/${randomPath}/index.html`
}

const isArtPage = () => {
    return paths.some(x => location.href.includes(x))
}
