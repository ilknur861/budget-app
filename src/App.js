import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/list" element={<TransactionList />} />
      </Routes>
    </Router>
  );
}

export default App;
