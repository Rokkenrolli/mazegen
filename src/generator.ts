import { Block } from "./render"
import {  height, width } from "./canvas"
import {neighbours, determineDir, Direction} from "./utils"
import render from "./render"






const generator = (context:CanvasRenderingContext2D, board:Block[][], correctPath: Block[]) => {
    const path:Block[]  = [board[0][0]]

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

  
  let current:Block | undefined = board[0][0]
  let next:Block | undefined  = undefined

/**
 * step is a single step of depth-first search algorithm,
 * which is rendered on a canvas
 */

  const step = () => { 

  if (path.length) {
    window.requestAnimationFrame(step)
    if (!current) return
    current.next = false
    current.visited = true
    const neighbors = neighbours(board,current)
    if (neighbors.length) {
        next= neighbors[Math.floor(Math.random()*neighbors.length)]; //pick a random next neighbor
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
  render(context,board,correctPath)
  }
  
window.requestAnimationFrame(step)
}

export default generator