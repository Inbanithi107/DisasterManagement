import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';


function App() {
  window.global = window
  return (
    <Routes>
      <Route path='/' element={<Dashboard />}/>
    </Routes>
  );
}

export default App;