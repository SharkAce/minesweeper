const width = 1200
const height = 800 
const tileSize = 50

new p5()

function setup(){
    let canvas = createCanvas(width, height)
    let pos = {
      x : (windowWidth - width) / 2,
      y : (windowHeight - height) / 2
    }
    canvas.position(pos.x, pos.y)
}

const world = new World({
    xLen: Math.floor(width/tileSize),
    yLen: Math.floor(height/tileSize),
    bombQty: 90
})

function draw(){
    background(245)
    world.renderTiles()
}


//left click
function mouseClicked(){
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
        try {
            world.flag(
                Math.floor(mouseX/tileSize),
                Math.floor(mouseY/tileSize)
            )
        }
        catch(err){
            return true
        }
        return false
    }
}