const length = 1000
const height = 750
const tileSize = 50

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
    xLen: Math.floor(length/tileSize),
    yLen: Math.floor(height/tileSize),
    bombQty: 4
})

world.createGrid(world.options)

function draw(){
    background(245)
    world.renderTiles()
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