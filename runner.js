
const paths = ["boxes", "generative_cacti", "void", "fireflies", "graph", "wiggles"]
setInterval(() => {
    console.log("here")
    let randomPath
    do{
    randomPath = ranChoice(paths)
    }while(location.href.includes(randomPath))
    location.href = `../${randomPath}/index.html`
}, 3600000);

const ranChoice = (items) => items[Math.floor(Math.random() * items.length)]

