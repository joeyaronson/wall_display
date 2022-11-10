
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
    "matrix",
    "orb",
    "rainbow",
    "sin",
    "swarm",
    "tiedye",
    "void",
    "wave",
    "wiggles",
]
setInterval(() => {
    if (isArtPage) {
        choosePage();
    }
}, 3600000);

setInterval(() => {
    let d = new Date();
    console.log("checking")
    if (d.getHours() === 0 && isArtPage()) {
        location.href = `../sleep.html`
    }
}, 10000);

setInterval(() => {
    let d = new Date();
    if (d.getHours() === 9 && !isArtPage()) {
        choosePage(true);
    }
}, 600000);

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
