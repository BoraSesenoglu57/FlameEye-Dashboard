import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Details from './Details';
import Login from './Login';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  // Canlı veriyi burada merkezi olarak tutuyoruz
  const [liveData, setLiveData] = useState({ temp: 42.0, wind: 18.0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        temp: +(prev.temp + (Math.random() * 0.4 - 0.2)).toFixed(1),
        wind: +(prev.wind + (Math.random() * 0.6 - 0.3)).toFixed(1)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          onShowDetails={() => setCurrentPage('details')}
          currentData={liveData} // Canlı veriyi gönderiyoruz
        />
      )}

      {currentPage === 'details' && (
        <Details
          onBack={() => setCurrentPage('dashboard')}
          currentData={liveData} // Aynı canlı veriyi buraya da gönderiyoruz
        />
      )}
    </div>
  );
}

export default App;