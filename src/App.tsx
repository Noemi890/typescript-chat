import React from 'react';
import { Auth } from './Auth';
import { Chat } from './components/Chat';
import { Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />}/>
        <Route path='/chat' element={<Chat />}/>
      </Routes>
    </div>
  );
}

export default App;
