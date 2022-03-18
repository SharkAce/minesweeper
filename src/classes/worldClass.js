class World {
    constructor (options){
        this.options = options;
        this.failed = false
        this.grid = []
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
            flatGrid.splice(rnd,1)
            bombPos.push({x: rnd % options.xLen, y: Math.floor(rnd/options.yLen)})
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

        for (let x=0; x<options.xLen; x++){
            for (let y=0; y<options.yLen; y++){
                this.grid[x][y].neighbourBomb = this.findNeighbour(x,y,'bomb')
            }
        }
    }

    findNeighbour (x,y,type){
        let range = 1
        let n = 0, fi=x+range, fj=y+range
    
        for (x-=range; x<=fi; x++){
            y=fj-range
            for (y-=range; y<=fj; y++){
                try {
                    switch(type){
                        case 'bomb' : if (this.grid[x][y].isBomb){n++}; break;
                        case 'zero' : if (this.grid[x][y].neighbourBomb == 0 && this.grid[x][y].clicked){n++};
                    }        
                }
                catch(err) {
                    null
                };
            };
        };
        return n
    };

    checkForZero(x,y){
        
        for (let x=0; x<this.options.xLen; x++){
            for (let y=0; y<this.options.yLen; y++){
                if (this.findNeighbour(x,y,'zero') >= 1) {
                    this.grid[x][y].clicked = true
                    this.grid[x][y].flagged = false
                }
            }
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
            this.checkForZero(x,y)
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
}