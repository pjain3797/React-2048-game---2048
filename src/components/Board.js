import React, { useEffect, useState } from "react";

export default function Board({ GridSize }) {
  const initGrid = [...Array(GridSize)].map(() => [...Array(GridSize)].fill(0));

  const [grid, setGrid] = useState(initGrid);
  const [gameOver, setGameOver] = useState(false);

  const addNewNumbe = (gridCopy) => {
      let freeSpaces = [];

      for (let i = 0; i < GridSize; i++){
          for(let j = 0; j < GridSize; j++){
              if(grid[i][j] === 0){
                  freeSpaces.push({row: i, col: j});
              }
          }
      }

      if (freeSpaces.length === 0) {
          setGameOver(true);
      }
      let position = Math.floor(Math.random() * freeSpaces.length);
      gridCopy[freeSpaces[position].row][freeSpaces[position].col] = Math.random() > 0.5 ? 2 : 4;
      setGrid(gridCopy);
  };

  const rightShift = () => {

    const gridCopy = [...grid];
    gridCopy.map((row) =>{
        rightShift
    });
       
  }

  const shift = () => {
      const arr = row.filter(val => val);
      const zeroCount = row.length - arr.length;
      const zeros = [...Array(zeroCount)];
      arr = arr.append(zeros);
      return arr;
  }

  const handleKeydownEvent = (event) => {
      console.log(event);
      event.preventDefault();
      if(gameOver) {
          return;
      }
      const { code } = event;
      switch (code) {
          case 'ArrowUp' : 
          topShift();
          break;
          case 'ArrowDown' : 
          bottomShift();
          break;
          case 'ArrowLeft' : 
          leftShift();
          break;
          case 'ArrowRight' : 
          rightShift();
          break;
          default:
            break;
      }
  };

  useEffect(() => {
    window.addEventListener('keydown',handleKeydownEvent);
    
    return () => {
        window.removeEventListener('keydown',handleKeydownEvent);        
    }
  },[grid]);

  return (
    <>
      <div className="board">
        {grid.map((row, rowIndex) => (
          <div className="board-row" key={rowIndex}>
            {row.map((val, index) => (
              <div className={`board-box ${val !== 0 && 'board-box-high'}`} key={index}>
                {val !== 0 && val}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
