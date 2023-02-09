import './App.css';

import { AutomataGrid, conwaysGameOfLifePreset } from 'cellular-automata-react';

function App() {
  return (
    <div className="App">
      <AutomataGrid
        rules={conwaysGameOfLifePreset} size={{
          xWidth: 4,
          yWidth: 4
        }}
        className='a'
        pixelsActive={[[1,1]]}
        iterationTimeInMs={1000}
      />
    </div>
  );
}

export default App;
