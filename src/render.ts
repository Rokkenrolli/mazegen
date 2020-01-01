import {width,height,rows,cols,lines} from "./canvas"


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



const render = (context:CanvasRenderingContext2D, board: Block[][]) => {
    
    const blockWidth  = width  / cols
    const blockHeight = height / rows

    
    const draw = (block:Block) => {
        context.fillRect(block.pos.x,block.pos.y,blockWidth,blockHeight)
        if(block.start) context.fillStyle = "orange"
        else if(block.end) context.fillStyle = "orange"
        else if (block.next) context.fillStyle = "blue"
        else if (block.visited) context.fillStyle= "white"
        else context.fillStyle="#b678bd"
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
            context.strokeStyle = "green"
            context.stroke()
        }
        
        if (block.bottomWall) drawLine(botLeft, botRight)
        if (block.leftWall)   drawLine(topLeft, botLeft)
        if (block.rightWall)  drawLine(topRight,botRight)
        if (block.topWall)    drawLine(topLeft, topRight)
       
    }

    const drawConnecting = (block: Block) => {
        const pos:Coord = {x: block.pos.x + blockWidth / 2, y:block.pos.y+blockHeight /2}
        if (block.pred) {
            const predPos:Coord = {x:block.pred.pos.x + blockWidth /2, y:block.pred.pos.y + blockHeight / 2}
            context.beginPath()
            context.strokeStyle = "black"
            context.moveTo(pos.x,pos.y)
            context.lineTo(predPos.x,predPos.y)
            context.stroke()
        }
    }


    board.forEach(col => col.forEach(e =>{
        draw(e) 
        drawWalls(e)
        if (lines) drawConnecting(e)
    } ) )
}

export default render