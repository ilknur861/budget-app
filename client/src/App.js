import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTransaction from './components/AddTransaction';
import TransactionList from './components/TransactionList';
import SpendingOverview from './components/SpendingOverview';
import SpendingChart from './components/SpendingChart';
import EditTransaction from './components/EditTransaction';
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
    return (
        // Add basename conditionally based on environment
        <Router basename={process.env.NODE_ENV === "production" ? "/budget-app" : "/"}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddTransaction />} />
                <Route path="/list" element={<TransactionList />} />
                <Route path="/edit/:id" element={<EditTransaction />} />
                <Route path="/overview" element={<SpendingOverview />} />
                <Route path="/chart" element={<SpendingChart />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
