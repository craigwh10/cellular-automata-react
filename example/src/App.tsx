import React from 'react';
import './App.css';
import {AutomataGrid, conwaysGameOfLifePreset} from 'cellular-automata-react';

function App() {
  const generateSoup = (size: number) => {
    let activePixels: [number, number][] = [];

    for (let idx1 = 0; idx1 < size; idx1++) {
      for (let idx2 = 0; idx2 < size; idx2++) {
        if (Math.random() <= 0.5) {
            activePixels.push([idx1, idx2]);
        }
      }
    }
    
    return activePixels;
  };

  const soup = generateSoup(20);

  return (
    <div className="App">
      <header className="App-header">
        <AutomataGrid
          pixelsActive={soup}
          iterationTimeInMs={500}
          size={20}
          rules={conwaysGameOfLifePreset}
        />
      </header>
    </div>
  );
}

export default App;
