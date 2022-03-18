const length = 1000
const height = 750
const tileSize = 1000/20

new p5()

function setup(){
    let canvas = createCanvas(length, height)
    let pos = {
      x : (windowWidth - width) / 2,
      y : (windowHeight - height) / 2
    }
    canvas.position(pos.x, pos.y)
}

const world = new World({
    xLen: 20,
    yLen: 15,
    bombQty: 60
})

world.createGrid(world.options)

function draw(){
    background(245)
    world.grid.forEach((row) => row.forEach((tile) => tile.render()));
    world.checkForZero()
}


//left click
function mouseClicked(event){
    if (!world.failed){
        world.click(
            Math.floor(mouseX/tileSize),
            Math.floor(mouseY/tileSize)
        )
    }
}
//right click
document.oncontextmenu = () => {
    if (!world.failed){
        world.flag(
            Math.floor(mouseX/tileSize),
            Math.floor(mouseY/tileSize)
        )
        return false
    }
}