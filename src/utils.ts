import render, { Block, } from "./render"

export enum Direction {
    Up = 1,
    Down,
    Left,
    Right,
}   

const neighbours = (board:Block[][],block:Block,cols:number,rows:number, solving?:boolean):Block[] => {
    const row = block.row
    const col = block.col
    let all:Block[] = []
    if (row > 0 ) all.push(board[col][row -1])
    if (col > 0 ) all.push(board[col -1][row])
    if (row < rows -1) all.push(board[col][row +1])
    if (col < cols -1) all.push(board[col+1][row])
    if (all.length === 0) return []
    else {
        const filtered = all.filter(x=>solving? !x.solved: !x.visited)
        return filtered
    }
}



//determines the direction of the second block in relation of the first block
const determineDir = (first:Block, second:Block) => {
    
    const rowDif = first.row - second.row
    const colDif = first.col - second.col

    if (rowDif < 0)  return Direction.Down 
    if (rowDif > 0)  return Direction.Up
    if (colDif < 0)  return Direction.Right
    if (colDif > 0)  return Direction.Left

   
}

const filterAvailable = (current:Block, neighbours: Block[]) => {
    return neighbours.filter(b => {
        const directionFromCurrent = determineDir(current, b)
        switch (directionFromCurrent) {
            case Direction.Up:
                return !(current.topWall && b.bottomWall)
            case Direction.Down:
                return !(current.bottomWall && b.topWall)
            case Direction.Left:
                return !(current.leftWall && b.rightWall)
            case Direction.Right:
                return !(current.rightWall && b.leftWall)
        }
        return false
    })
}

const generateCorrectPath = (context:CanvasRenderingContext2D,board: Block[][],cPath:Block[], blockWidth:number, blockHeight: number) => {
    const start = findStartOrEnd(board, true)
    const end = findStartOrEnd(board, false)
    if (!(start)) {
        return //start and end should always exist
    }
    if (!end) {
        return
    }
    cPath = [];
    let current = end;
    const step = () =>  {
        if (current.pred) {
            window.requestAnimationFrame(step)
            cPath.push(current);
            current.onPath = true
            current = current.pred;
        }
        render(context, board, blockWidth, blockHeight);
     
    }
   
    cPath.push(start);
    start.onPath = true
    window.requestAnimationFrame(step)
    
  };

  const findStartOrEnd = (board: Block[][], start:boolean): Block | undefined => {
    let found: Block |undefined  
    board.forEach(e => {
        e.forEach(b => {
            if (start ? b.start : b.end) {
                found = b
                return
            }
        })
    })
    return found
  }

  const filterEdges = (board: Block[][], cols: number, rows:number) => {
      const filtered:Block[] = []
      board.forEach(c => {
          c.forEach(b => {
              if (b.row === 0 || b.row === rows-1 || b.col === 0 || b.col === cols-1) {
                  filtered.push(b)
              }
          })
      })
      return filtered
  }

  const randomizeStartAndEnd = (board:Block[][], cols:number, rows: number, start:boolean) => {
        const availableSpots = filterEdges(board,cols,rows)
        
        
      
        const cell = availableSpots[Math.floor(Math.random() * availableSpots.length)] //pick one randomly
        start ? cell.start = true : cell.end=true
        if (start) cell.visited = true
  }

export {neighbours, determineDir, filterAvailable, generateCorrectPath, findStartOrEnd, randomizeStartAndEnd}