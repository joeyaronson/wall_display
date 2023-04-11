const paths = [
    "abstract",
    "arc_clock",
    "balls",
    "boxes",
    "cacti",
    "cell_clock",
    "cells",
    "checkerboard",
    "cubes",
    "drip",
    "exclusion",
    "eye",
    "fireflies",
    "flower",
    "geometry",
    "graph",
    "grid",
    "grow_clock",
    "hallway",
    "hills",
    "hypercube",
    "iris",
    "light_clock",
    "mandala",
    "mandala3D",
    "mondrian",
    "orb",
    "rainbow",
    "recurse",
    "rhombus",
    "rps",
    "sin_wave",
    "swarm",
    "swarm_clock",
    "tiedye",
    "tiles",
    "tile_wave",
    "tree",
    "void",
    "wave",
    "wiggles",
];

setInterval(() => {
    if (isArtPage()) {
        let paths = localStorage.getItem("paths").split(",")
        let index = Number(localStorage.getItem("index"))
        index = (index + 1) % paths.length
        nextPath = paths[index]
        localStorage.setItem("index", index)
        location.href = `../${nextPath.replaceAll("_", "")}/index.html`
    }
}, 3600000);

setInterval(() => {
    let d = new Date();
    if (d.getHours() === 0 && isArtPage()) {
        location.href = `../sleep.html`
    }
}, 60000);

setInterval(() => {
    let d = new Date();
    if (d.getHours() === 10 && !isArtPage()) {
        choosePage(true);
    }
    let canv = document.getElementById('defaultCanvas0')
    if (canv) {
        canv.focus()
    }

}, 1000);

document.addEventListener('keyup', (e) => {
    if (e.code === "Digit2") {
        if (isArtPage()) {
            location.href = `../home.html`

        } else {
            location.href = `./home.html`

        }
        localStorage.clear("paths")
        localStorage.clear("index")
    } else if (e.code === "Digit3") {
        let paths = localStorage.getItem("paths").split(",")
        let index = Number(localStorage.getItem("index"))
        if (index - 1 < 0) {
            index = paths.length - 1
        } else {
            index = index - 1
        }
        nextPath = paths[index]
        localStorage.setItem("index", index)
        location.href = `../${nextPath.replaceAll("_", "")}/index.html`

    } else if (e.code === "Digit4") {
        let paths = localStorage.getItem("paths").split(",")
        let index = Number(localStorage.getItem("index"))
        index = (index + 1) % paths.length
        nextPath = paths[index]
        localStorage.setItem("index", index)
        location.href = `../${nextPath.replaceAll("_", "")}/index.html`
    }


});

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]

const shuffledArray = (arr) => arr.sort((a, b) => 0.5 - Math.random());

const choosePage = (sleep) => {
    let shuffledPaths = shuffledArray(paths)
    localStorage.setItem('paths', shuffledPaths);
    localStorage.setItem('index', 0)

    location.href = `./${shuffledPaths[0].replaceAll("_", "")}/index.html`;
}

const isArtPage = () => {
    return paths.some(x => location.href.includes(x.replaceAll("_", "")))
}
