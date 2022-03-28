class World {
    constructor (options){
        this.options = options;
        this.failed = false
        this.createGrid(options)
    }

    forEachTile(callback){
        for (let x=0; x<this.options.xLen; x++){
            for (let y=0; y<this.options.yLen; y++){
                callback(this.grid[x][y])
            }
        }
    }

    createGrid(options){
        this.failed = false
        let flatGrid = []
        let bombPos = []
        for (let i=0; i<options.xLen*options.yLen; i++){
            flatGrid.push(i)
        }
        for (let i=0; i<options.bombQty; i++){
            let rnd = random(flatGrid)
            flatGrid.splice(flatGrid.indexOf(rnd),1)
            bombPos.push({y: rnd % options.yLen, x: Math.floor(rnd/options.yLen)})
        }
        this.grid = []
        for (let x=0; x<options.xLen; x++){
            this.grid.push([])
            for (let y=0; y<options.yLen; y++){
                let isBomb = false
                bombPos.forEach((i) => {
                    if (i.x == x && i.y == y){isBomb = true}
                })
                this.grid[x].push(new Tile({x:x,y:y},isBomb,this))
            }
        }

        this.forEachTile( (tile) => 
            tile.neighbourBomb = this.findNeighbour(tile.pos.x,tile.pos.y,'bomb')
        )
    }

    findNeighbour (x,y,type){
        let n = 0, fx=x+1, fy=y+1

        for (x-=1; x<=fx; x++){
            y=fy-1
            for (y-=1; y<=fy; y++){
                try {
                    switch(type){
                        case 'bomb' : 
                            if (this.grid[x][y].isBomb){n++}; break;
                        case 'zero' : 
                            if (this.grid[x][y].neighbourBomb == 0 && 
                                this.grid[x][y].clicked){n++}; break;
                        case 'clicked' : 
                            if (this.grid[x][y].clicked) {n++}; break;
                    }        
                }
                catch(err) {
                    null
                }
            }
        }
        return n
    }

    checkForZero(){
        let stop = false
        while(!stop){
            stop = true
            this.forEachTile( (tile) => {
                if (
                    !tile.clicked && (this.findNeighbour(tile.pos.x,tile.pos.y,'zero') >= 1 ||
                    (this.findNeighbour(tile.pos.x,tile.pos.y,'clicked') >= 1 && tile.neighbourBomb == 0))
                ) {
                    tile.clicked = true
                    tile.flagged = false
                    stop = false
                }
            })
        }
    }
    
    click(x,y){
        if (this.grid[x][y].isBomb){
            if (!this.grid[x][y].flagged){
                this.failed = true
            }
        }
        else if (!this.grid[x][y].flagged){
            this.grid[x][y].clicked = true
            this.checkForZero()
        }
    }

    flag(x,y){
        if (!this.grid[x][y].clicked){
            if (!this.grid[x][y].flagged){
                this.grid[x][y].flagged = true
            } else {
                this.grid[x][y].flagged = false
            }
        }
    }
    renderTiles(){
        this.forEachTile( (tile) => tile.render())
    }
}