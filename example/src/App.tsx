import React from 'react';
import './App.css';
import SayHello from 'cellular-automata-react/lib/esm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SayHello name="hi" />
      </header>
    </div>
  );
}

export default App;
