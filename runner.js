
const paths = [
    "balls",
    "boxes",
    "cacti",
    "cubes",
    "drip",
    "exclusion",
    "fireflies",
    "flower",
    "graph",
    "grid",
    "mandala",
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
    let randomPath
    do {
        randomPath = ranChoice(paths)
    } while (location.href.includes(randomPath))
    location.href = `../${randomPath}/index.html`
}, 3600000);

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]

