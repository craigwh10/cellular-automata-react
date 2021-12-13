import React from 'react';
import './App.css';
import {AutomataGrid, conwaysGameOfLifePreset} from 'cellular-automata-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AutomataGrid
          pixelsActive={[
            [0,0], [0,1],
            [1,0], [1,1],
            [2,2], [2,3],
            [3,2], [3,3]
            
          ]}
          iterationTimeInMs={1000}
          size={4}
          rules={conwaysGameOfLifePreset}
        />
      </header>
    </div>
  );
}

export default App;
