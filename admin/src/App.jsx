import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';

import ErrorBoundary from './components/ErrorBoundary';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Orders from './pages/orders';

// eslint-disable-next-line react-refresh/only-export-components
export const backendurl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {
  const [token, settoken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  // ✅ If not logged in, show login
  if (token === '') {
    return (
      <div className='bg-gray-50 min-h-screen'>
        <ToastContainer />
        <Login settoken={settoken} />
      </div>
    );
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      <Navbar settoken={settoken} />
      <hr />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-sm'>
          <Routes>
            {/* ✅ Redirect from / to /dashboard if logged in */}
            <Route path='/' element={<Navigate to="/dashboard" replace />} />

            <Route
              path='/dashboard'
              element={
                <ErrorBoundary>
                  <Dashboard token={token} />
                </ErrorBoundary>
              }
            />
            <Route
              path='/add'
              element={
                <ErrorBoundary>
                  <Add token={token} />
                </ErrorBoundary>
              }
            />
            <Route
              path='/list'
              element={
                <ErrorBoundary>
                  <List token={token} />
                </ErrorBoundary>
              }
            />
            <Route
              path='/order'
              element={
                <ErrorBoundary>
                 <Orders token={token}/>
                </ErrorBoundary>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
