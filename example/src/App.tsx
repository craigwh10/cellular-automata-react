import { useEffect, useState } from 'react';
import './App.css';

import { AutomataGrid, conwaysGameOfLifePreset } from 'cellular-automata-react';

function App() {
  const [state, setState] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(1);
    }, 2000)

    return () => {
      clearTimeout(timeout);
    }
  }, [])

  if (state === 1) {
    return <div className="App">
    <AutomataGrid
      rules={conwaysGameOfLifePreset} size={{
        xWidth: 4,
        yWidth: 4,
      }}
      pixelStyles={{
        activeColor: 'purple',
        inactiveColor: 'orange',
        width: 10,
        height: 10
      }}
      key={2}
      className='a'
      pixelsActive={[[1,1]]}
      iterationTimeInMs={10000}
    />
  </div>
  }

  return (
    <div className="App">
      <AutomataGrid
        rules={conwaysGameOfLifePreset} size={{
          xWidth: 4,
          yWidth: 4
        }}
        className='a'
        key={1}
        pixelsActive={[[1,1]]}
        iterationTimeInMs={1000}
      />
    </div>
  );
}

export default App;
