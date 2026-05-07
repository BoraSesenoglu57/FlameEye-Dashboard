import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Details from './Details';
import Login from './Login';

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  // --- 1. DEĞİŞİKLİK: Seçili olayı tutacak state ---
  const [selectedIncident, setSelectedIncident] = useState(null);

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

  // --- 2. DEĞİŞİKLİK: Olay verisini kabul eden fonksiyon ---
  const handleShowDetails = (incidentData) => {
    setSelectedIncident(incidentData); // Tıklanan veriyi kaydet
    setCurrentPage('details');         // Sayfayı değiştir
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login onLoginSuccess={() => setCurrentPage('dashboard')} />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          onShowDetails={handleShowDetails} // Güncellenmiş fonksiyonu gönder
          currentData={liveData}
        />
      )}

      {currentPage === 'details' && (
        <Details
          onBack={() => setCurrentPage('dashboard')}
          currentData={liveData}
          incident={selectedIncident} // --- 3. DEĞİŞİKLİK: Veriyi Details'e gönder ---
        />
      )}
    </div>
  );
}

export default App;