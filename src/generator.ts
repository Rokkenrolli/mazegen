import { Block } from "./render"
import {  rows, cols, height, width } from "./canvas"
import render from "./render"


enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}



const generator = (context:CanvasRenderingContext2D, board:Block[][]) => {
    const startingpoint   = board[0][0]
    const path:Block[]    = [startingpoint]
    startingpoint.topWall = false
    startingpoint.visited = true
    startingpoint.start   = true


const neighbours = (block:Block) => {
    const row = block.row
    const col = block.col
    let all:Block[] = []
    if (row > 0 ) all.push(board[col][row -1])
    if (col > 0 ) all.push(board[col -1][row])
    if (row < rows -1) all.push(board[col][row +1])
    if (col < cols -1) all.push(board[col+1][row])
    if (all.length === 0) return []
    else {
        const filtered = all.filter(x=>!x.visited)
        console.log(filtered)
        return filtered
    }
}    


//returns dir which is needed to break the wall
//determines the direction from first block to second
const determineDir = (first:Block, second:Block) => {
    
    const rowDif = first.row - second.row
    const colDif = first.col - second.col

    if (rowDif < 0)  return Direction.Down 
    if (rowDif > 0)  return Direction.Up
    if (colDif < 0)  return Direction.Right
    if (colDif > 0)  return Direction.Left

   
}

const breakWall = (start: Block,end:Block) => {

    const dir = determineDir(start,end)
    if (dir === Direction.Up) {
        start.topWall = false
        end.bottomWall = false
    }

    if (dir === Direction.Down) {
        start.bottomWall = false
        end.topWall      = false 
    }

    if (dir === Direction.Left) {
        start.leftWall = false
        end.rightWall = false
    }

    if (dir === Direction.Right) {
        start.rightWall = false
        end.leftWall = false
    }
    
}

  
  let current:Block | undefined = startingpoint
  let next:Block | undefined  = undefined
  const step = () => { 

  if (path.length) {
    window.requestAnimationFrame(step)
    if (!current) return
    console.log(current.row + " " + current.col)
    current.next = false
    current.visited = true
    const neighbors = neighbours(current)
    if (neighbors.length) {
        next= neighbors[Math.floor(Math.random()*neighbors.length)];
        next.pred = current
        next.next = true
         breakWall(current,next)
         path.push(current = next)
    }

    else {
            current = path.pop()
    }

  }
  context.clearRect(0,0,width,height)
  render(context,board)
  }
  
window.requestAnimationFrame(step)
}

export default generator