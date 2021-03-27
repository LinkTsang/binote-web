import React from 'react';
import './App.css';
import ZEditor from './editor/ZEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">ZNote Demo</header>
      <div style={{ height: '100%' }}>
        <ZEditor />
      </div>
    </div>
  );
}

export default App;
