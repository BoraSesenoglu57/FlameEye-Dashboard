import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Harita ikonu ayarı (Leaflet varsayılan ikon hatasını önlemek için)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = ({ onShowDetails, currentData }) => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/incidents')
      .then(response => response.json())
      .then(data => {
        // Sadece durumu 'Active' olanları filtreleyip listeye alıyoruz
        const activeAlerts = data.filter(incident => incident.status === 'Active');
        setIncidents(activeAlerts);
      })
      .catch(err => console.error("Data fetch error:", err));
  }, []);

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh', backgroundColor: '#1A1A2E', color: 'white' }}>

      {/* Sidebar */}
      <aside style={{ width: '300px', borderRight: '1px solid #493222', padding: '20px', background: '#252836', zIndex: 1000 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <span style={{ fontSize: '20px' }}>🔥</span>
          <h2 style={{ color: 'white', margin: 0, fontSize: '20px' }}>FlameEye AI</h2>
        </div>

        <section>
          <h3 style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', marginBottom: '15px' }}>Environmental Sensors</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#1A1A24', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>TEMP</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#f47b25' }}>{currentData.temp}°C</p>
            </div>
            <div style={{ background: '#1A1A24', padding: '10px', borderRadius: '8px', border: '1px solid #333' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>WIND</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{currentData.wind} km/h</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', marginBottom: '15px' }}>Live Alerts</h3>
          {incidents.map(incident => (
            <div key={incident.id} style={{ borderLeft: '4px solid #f47b25', padding: '12px', background: 'rgba(244,123,37,0.05)', marginBottom: '10px' }}>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{incident.severity} Alert</p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#ccc' }}>{incident.alarm_id} | {incident.location_name || 'Active'}</p>
            </div>
          ))}
        </section>
      </aside>

      {/* Main Map Panel */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: '15px 30px', background: '#252836', borderBottom: '1px solid #493222', textAlign: 'right' }}>
          <span style={{ color: '#4ade80', fontSize: '13px' }}>● Real-time connection active</span>
        </header>

        <div style={{ flex: 1, width: '100%' }}>
          <MapContainer center={[39.9334, 32.8597]} zoom={6} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {incidents.map(incident => (
              <Marker key={incident.id} position={[incident.latitude, incident.longitude]}>
                <Popup>
                  <div style={{ color: 'black', fontFamily: 'sans-serif' }}>
                    <strong style={{ fontSize: '14px' }}>{incident.alarm_id}</strong><br/>
                    <span style={{ fontSize: '12px' }}>Confidence: {incident.confidence * 100}%</span><br/>
                    <button
                      onClick={() => onShowDetails(incident)} // incident objesini buraya parametre olarak gönderdik
                      style={{
                        marginTop: '8px',
                        cursor: 'pointer',
                        background: '#f47b25',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;