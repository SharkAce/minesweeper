class Tile{
    constructor(pos, isBomb, world){
        this.world = world
        this.pos = pos;
        this.isBomb = isBomb;
        this.flagged = false;
        this.clicked = false;
    }
    render(){
        this.clicked ? fill(255) : fill(220) 
        square(this.pos.x*tileSize+1, this.pos.y*tileSize+1,tileSize-2)
        if (this.clicked) {
            textAlign(CENTER)
            textSize(tileSize/2)
            switch (this.neighbourBomb){
                case 0 : fill(255); break;
                case 1 : fill('blue'); break;
                case 2 : fill('green'); break;
                case 3 : fill('red'); break
                case 4 : fill('darkblue'); break;
                case 5 : fill('brown'); break;
                case 6 : fill('turquoise'); break;
                default: fill('purple')
            }
            text(this.neighbourBomb,this.pos.x*tileSize+tileSize/2,this.pos.y*tileSize+tileSize/1.5)
        }
        if (this.flagged && !this.world.failed){
            fill(0)
            rect(tileSize*0.2+this.pos.x*tileSize,tileSize*0.75+this.pos.y*tileSize,tileSize*0.6,tileSize*0.14)
            rect(tileSize*0.3+this.pos.x*tileSize,tileSize*0.65+this.pos.y*tileSize,tileSize*0.4,tileSize*0.14)
            rect(tileSize*0.45+this.pos.x*tileSize,tileSize*0.2+this.pos.y*tileSize,tileSize*0.1,tileSize*0.65)
            fill(255,0,0)
            triangle(tileSize*0.45+this.pos.x*tileSize, tileSize*0.2+this.pos.y*tileSize, tileSize*0.45+this.pos.x*tileSize, 
                tileSize*0.45+this.pos.y*tileSize, tileSize*0.2+this.pos.x*tileSize, tileSize*0.45+this.pos.y*tileSize)
        }
        if (this.world.failed){
            if (this.isBomb){
                fill(100)
                circle(this.pos.x*tileSize + tileSize/2, this.pos.y*tileSize+tileSize/2, tileSize/1.5)
                if (this.flagged){
                    strokeWeight(4)
                    line(
                        this.pos.x*tileSize+tileSize*0.30,  this.pos.y*tileSize+tileSize*0.30, 
                        this.pos.x*tileSize+tileSize*0.70,  this.pos.y*tileSize+tileSize*0.70
                    )
                    line(
                        this.pos.x*tileSize+tileSize*0.70,  this.pos.y*tileSize+tileSize*0.30, 
                        this.pos.x*tileSize+tileSize*0.30,  this.pos.y*tileSize+tileSize*0.70
                    )
                    strokeWeight(1)
                }
            }
        }
    }
}