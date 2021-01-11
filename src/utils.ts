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

const generateCorrectPath = (context:CanvasRenderingContext2D,board: Block[][],cPath:Block[],cols:number, rows:number, blockWidth:number, blockHeight: number) => {
    
    cPath = [];
    let current = board[cols - 1][rows - 1];
    const step = () =>  {
        if (current.pred) {
            window.requestAnimationFrame(step)
            cPath.push(current);
            current.onPath = true
            current = current.pred;
        }
        render(context, board, blockWidth, blockHeight);
     
    }
   
    cPath.push(board[0][0]);
    board[0][0].onPath = true
    window.requestAnimationFrame(step)
    
  };

export {neighbours, determineDir, filterAvailable, generateCorrectPath}