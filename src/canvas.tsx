import React, { useRef,useEffect} from 'react'
import './App.css'
import render, { Block } from './render';
import generator from './generator';


export const width  = window.innerWidth * 0.8
export const height = window.innerHeight * 0.8 
export const rows   = 30
export const cols   = 60
export const blockWidth =  width / cols
export const blockHeight = height / rows
export let lines = false
export let path  = false 

const Canvas  = () => {

    
    const canvasRef = useRef<HTMLCanvasElement>(null); 
    let cPath:Block[] = []    
    let board: Block[][] = []
    const generate = () => {
      if (!canvasRef.current) return
      const context = canvasRef.current.getContext("2d")
      if(!context) return
        initalize(context)
        generator(context,board,cPath)
      }
    
      const solve = () => {
        alert("not implemented")
      }

      const generateCorrectPath = () => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext("2d")
        if(!context) return
        cPath = []
        let current = board[cols -1][rows -1]
        while(current.pred) {
            cPath.push(current)
            current = current.pred
        }
        cPath.push(board[0][0])
       render(context,board,cPath)
    }


      const setLines = () => {
        if (!canvasRef.current) return
       const context = canvasRef.current.getContext("2d")
       if(!context) return
       lines = !lines
       render(context,board,cPath)
      }

      const showPath = () => {
        if (!board[cols-1][rows -1].visited) {
          alert("Maze not finished yet")
          return;
        }
        else {     
          path = !path
          generateCorrectPath()
     
        }
        
      }

      const initalize = ( context:CanvasRenderingContext2D ) => {

        board = []
        context.clearRect(0,0,width,height)

        for (let col= 0; col < cols; col++) {
            const temp:Block[] =[]
            for (let row = 0; row < rows; row++)
            temp.push({
                leftWall: true,
                topWall:true,
                rightWall:true,
                bottomWall:true,
                pos:{x:col * blockWidth, y:row*blockHeight},
                visited:false,
                row: row,
                col: col,
                next:false,
                pred: undefined,
                start:false,
                end: false
            })
            board.push(temp)

        }
         const start =board[0][0]
         start.start = true
         start.topWall = false
         start.visited = true
         board[cols -1][rows -1].end = true
         board[cols -1][rows -1].bottomWall = false
        render(context,board,cPath)
      }

      useEffect(() => {
        if (!canvasRef.current) return
        const context = canvasRef.current.getContext("2d")
        if(!context) return
        initalize(context)
      })
    

    return (
    <div className="canvasContainer">
         <div className ="buttons" >
            <button className= "generator" onClick = {() => generate()}>Generate Maze</button>
            <button className= "solver"    onClick = {() => solve()}>Solve maze</button>
            <button className= "lines"     onClick = {() => setLines()}>Show lines</button>
            <button className= "path"      onClick = {() => showPath()}>Show correct path</button>
         </div>   
         <div>
            <canvas ref={canvasRef} className="canvas" width ={width} height={height} />
         </div>
     
    </div>
        
    )
}

export default Canvas