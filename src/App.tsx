import React from 'react';
import { Auth } from './Auth';
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='/chat' element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App;
