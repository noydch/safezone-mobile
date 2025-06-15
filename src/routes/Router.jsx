import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import Login from '../pages/auth/Login';
import Orders from '../pages/orders/Orders';
import Booking from '../pages/book/Booking';
import AddBooking from '../pages/book/AddBooking';
import ProtectedRoute from './ProtectedRoute';
import OrderDetail from '../pages/orders/OrderDetail';

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="/" element={
                <ProtectedRoute>
                    <HomePage />
                </ProtectedRoute>
            } />
            <Route path="/orders" element={
                <ProtectedRoute>
                    <Orders />
                </ProtectedRoute>
            } />
            <Route path="/orders/orderDetail/:id" element={
                <ProtectedRoute>
                    <OrderDetail />
                </ProtectedRoute>
            } />
            <Route path="/booking" element={
                <ProtectedRoute>
                    <Booking />
                </ProtectedRoute>
            } />
            <Route path="/booking/add" element={
                <ProtectedRoute>
                    <AddBooking />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRouter;
