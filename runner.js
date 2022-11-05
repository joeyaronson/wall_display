
const paths = ["boxes", "generative_cacti", "void", "fireflies", "graph", "wiggles"]
setInterval(() => {
    console.log("here")
    const randomPath = ranChoice(paths)
    location.href = `../${randomPath}/index.html`
}, 4000);

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]

