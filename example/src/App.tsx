import React from 'react';
import './App.css';
import {AutomataGrid, conwaysGameOfLifePreset, generateSoup} from 'cellular-automata-react';

function App() {
  const soup = generateSoup({xWidth: 40, yWidth: 12});

  return (
    <div className="App">
      <header className="App-header">
        <AutomataGrid
          pixelsActive={soup}
          iterationTimeInMs={500}
          size={{
            xWidth: 40,
            yWidth: 12
          }}
          rules={conwaysGameOfLifePreset}
          pixelStyles={{
            activeColor: 'purple'
          }}
        />
      </header>
    </div>
  );
}

export default App;
