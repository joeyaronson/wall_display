
const paths = [
    "balls",
    "boxes",
    "cubes",
    "drip",
    "fireflies",
    "flower",
    "cacti",
    "graph",
    "grid",
    "matrix",
    "sin",
    "tiedye",
    "void",
    "wave",
    "wiggles"
]
setInterval(() => {
    let randomPath
    do {
        randomPath = ranChoice(paths)
    } while (location.href.includes(randomPath))
    location.href = `../${randomPath}/index.html`
}, 200000);

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]

