import {lines,blockHeight,blockWidth, path} from "./canvas"


export type Coord = {
    x: number
    y: number
}

export type Block = {
    leftWall:boolean
    topWall: boolean
    rightWall:boolean
    bottomWall:boolean
    pos: Coord
    visited:boolean
    row:number
    col:number
    next: boolean
    pred: Block | undefined
    start:boolean
    end:boolean
}



const render = (context:CanvasRenderingContext2D, board: Block[][], correctPath:Block[]) => {
  
    
    const draw = (block:Block, color:string) => {
        
        context.fillStyle= color
        context.fillRect(block.pos.x,block.pos.y,blockWidth,blockHeight)
        
    }
    
    

    const drawWalls = (block:Block) => {

        const topLeft  = {x:block.pos.x, y:block.pos.y}
        const botLeft  = {x:block.pos.x, y:block.pos.y + blockHeight}
        const topRight = {x:block.pos.x + blockWidth, y:block.pos.y}
        const botRight = {x:block.pos.x + blockWidth, y:block.pos.y + blockHeight}
        

        const drawLine = (start:Coord,end:Coord) => {
            context.beginPath()
            context.moveTo(start.x,start.y)
            context.lineTo(end.x,end.y)
            context.strokeStyle = "black"
            context.stroke()
        }
        
        if (block.bottomWall) drawLine(botLeft, botRight)
        if (block.leftWall)   drawLine(topLeft, botLeft)
        if (block.rightWall)  drawLine(topRight,botRight)
        if (block.topWall)    drawLine(topLeft, topRight)
       
    }

    const drawCorrectPath = (path: Block[]) => {
        context.fillStyle = "purple"
        path.forEach(x => {
            context.beginPath()
            context.arc(x.pos.x + blockWidth / 2,x.pos.y + blockHeight / 2, Math.abs(blockHeight - blockWidth) * 2,0,360)
            context.fill()
            context.stroke()
        })
    }

    const drawConnecting = (block: Block) => {
        const pos:Coord = {x: block.pos.x + blockWidth / 2, y:block.pos.y+blockHeight /2}
        if (block.pred) {
            const predPos:Coord = {x:block.pred.pos.x + blockWidth /2, y:block.pred.pos.y + blockHeight / 2}
            context.beginPath()
            context.strokeStyle = "green"
            context.moveTo(pos.x,pos.y)
            context.lineTo(predPos.x,predPos.y)
            context.stroke()
        }
    }


    board.forEach(col => col.forEach(e =>{
        if(e.start || e.end) draw(e,"orange")
        else if (e.next) draw(e,"blue")
        else if(e.visited) draw(e,"white")
        else draw(e,"#b678bd") 
        drawWalls(e)
        if (lines) drawConnecting(e)
        
    } ) )
    if (path)  drawCorrectPath(correctPath)
}

export default render