import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://upscpath-production.up.railway.app';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const response = await fetch(`${backendURL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        console.log('Auth check response status:', response.status);
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          console.log('User authenticated:', userData);
        } else if (response.status === 401) {
          console.log('User not authenticated');
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    checkAuth();

    // Set up interval to check session validity every 5 minutes
    const intervalId = setInterval(checkAuth, 300000);
    return () => clearInterval(intervalId);
  }, []);

  // Handle route protection
  const ProtectedRoute = ({ children }) => {
    if (loading) return <LoadingSpinner />;
    if (!user && authChecked) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard user={user} setUser={setUser} />
    </ProtectedRoute>
  } 
/>
          {/* Handle OAuth callback route */}
          <Route 
            path="/oauth-callback" 
            element={<OAuthCallback />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

// Component to handle OAuth callback
function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuth = async () => {
      try {
        // Verify authentication after callback
        const response = await fetch(`${backendURL}/auth/me`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('OAuth callback error:', error);
        navigate('/');
      }
    };

    completeAuth();
  }, [navigate]);

  return <LoadingSpinner />;
}

export default App;