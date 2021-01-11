
import { height, width } from "./canvas"
import render, { Block } from "./render"
import { neighbours, filterAvailable, generateCorrectPath } from "./utils"


const solver = (context:CanvasRenderingContext2D,board: Block[][],correctPath: Block[],cols:number, rows:number, blockWidth:number, blockHeight: number) => {
    const path:Block[]  = [board[0][0]] //start from the first block - set start
    let found = false

    const step = () => { 
        if (path.length) {

            if (!found) {

                window.requestAnimationFrame(step)
            }
            const current = path.shift()
            console.log(current)
            if (!current) {
                return false
            }
            current.solved = true
            if (current.end) {
                found = true
                generateCorrectPath(context, board, correctPath, cols, rows, blockWidth, blockHeight)
                board.forEach(e => e.forEach(r => r.solved = false))
                return current
            }
            console.log(board)
            const n = neighbours(board, current,cols,rows, true)
            console.log(n)
            const available = filterAvailable(current,n)
            console.log(available)
            available.forEach(e => {
                if (!e.solved) {
                    path.push(e)
                }
            })
        }
        
        context.clearRect(0,0,width,height)
        render(context,board,blockWidth, blockHeight)
        }
        
      window.requestAnimationFrame(step)
      
      
      }



export  {solver}