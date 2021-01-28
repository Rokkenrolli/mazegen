import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import render, { Block } from "./render";
import generator from "./generator";
import { solver } from "./solver";
import { randomizeStartAndEnd } from "./utils";

export const width = window.innerWidth * 0.8;
export const height = window.innerHeight * 0.8;

export let lines = false;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(40);
  const [blockWidth, setBlockWidth] = useState(width / cols);
  const [blockHeight, setBlockHeight] = useState(height / rows);
  const [randomizedLocations, setRandomizedLocations] = useState(false);
  const [rerollCount, increaseRerollCount] = useState(0);

  let cPath: Block[] = [];
  let board: Block[][] = [];
  let generating: boolean = false;

  const generate = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    if (generating) {
      alert("Maze is being generated");
      return;
    }
    generator(context, board, cols, rows, blockWidth, blockHeight);
  };

  const solve = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    if (generating) {
      alert("Maze is being Generated");
      return;
    }
    solver(context, board, cPath, cols, rows, blockWidth, blockHeight);
  };

  const setLines = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    lines = !lines;
    render(context, board, blockWidth, blockHeight);
  };

  const initalize = (context: CanvasRenderingContext2D) => {
    board = [];
    context.clearRect(0, 0, width, height);

    for (let col = 0; col < cols; col++) {
      const temp: Block[] = [];
      for (let row = 0; row < rows; row++)
        temp.push({
          leftWall: true,
          topWall: true,
          rightWall: true,
          bottomWall: true,
          pos: { x: col * blockWidth, y: row * blockHeight },
          visited: false,
          row: row,
          col: col,
          next: false,
          pred: undefined,
          start: false,
          end: false,
          solved: false,
          onPath: false,
        });
      board.push(temp);
    }
    if (randomizedLocations) {
      randomizeStartAndEnd(board, cols, rows, true); //pick random start
      randomizeStartAndEnd(board, cols, rows, false); //pick random end
    } else {
      const start = board[0][0];
      start.start = true;
      start.visited = true;
      const end = board[cols - 1][rows - 1];
      end.end = true;
    }

    render(context, board, blockWidth, blockHeight);
  };

  const reroll = () => {
    increaseRerollCount(rerollCount + 1);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    initalize(context);
  });

  return (
    <div className="canvasContainer">
      <div className="buttons">
        <button className="generator" onClick={() => generate()}>
          Generate Maze
        </button>
        <button className="solver" onClick={() => solve()}>
          Solve maze
        </button>
        <button className="lines" onClick={() => setLines()}>
          Show lines
        </button>
        <button onClick={() => setRandomizedLocations(!randomizedLocations)}>
          {randomizedLocations
            ? "Set static locations"
            : "Set randomized locations"}
        </button>
        {randomizedLocations && (
          <button onClick={() => reroll()}>Reroll</button>
        )}
        {randomizedLocations && (
          <p>{`You have rerolled ${rerollCount} ${
            rerollCount === 1 ? "time" : "times"
          }`}</p>
        )}
      </div>
      <div className="sliders">
        <input
          id="colSlider"
          type="range"
          min={1}
          onChange={(event) => {
            setCols(Number(event.target.value));
            setRows(rows);
            setBlockHeight(height / rows);
            setBlockWidth(width / cols);
          }}
          value={cols}
          step={1}
        ></input>
        <label htmlFor="colSlider">{`columns: ${cols}`}</label>
        <input
          id="rowSlider"
          type="range"
          min={1}
          onChange={(event) => {
            setRows(Number(event.target.value));
            setCols(cols);
            setBlockHeight(height / rows);
            setBlockWidth(width / cols);
          }}
          value={rows}
          step={1}
        ></input>
        <label htmlFor="rowSlider">{`rows: ${rows}`}</label>
      </div>
      <div>
        <canvas
          ref={canvasRef}
          className="canvas"
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default Canvas;
