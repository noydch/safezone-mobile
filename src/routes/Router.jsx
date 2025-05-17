import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/auth/Login';
import Orders from '../pages/orders/Orders';
import Booking from '../pages/book/Booking';
import AddBooking from '../pages/book/AddBooking';

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/add" element={<AddBooking />} />
        </Routes>
    );
}

export default AppRouter; 