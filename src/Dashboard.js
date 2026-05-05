import React from 'react';

const Dashboard = ({ onShowDetails, currentData }) => {

  // Örnek olay verisi
  const incidents = [
    { id: 'INC-001', location: 'Sierra Nevada', confidence: 98.7, severity: 'High' }
  ];

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: '100vh', backgroundColor: '#1A1A2E', color: 'white' }}>

      {/* Sol Yan Panel (Sidebar) */}
      <aside style={{ width: '300px', borderRight: '1px solid #493222', padding: '20px', background: '#252836' }}>

        {/* Yeni Düzenlenmiş Logo Alanı */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '30px',
          paddingLeft: '5px'
        }}>
          <span style={{ fontSize: '20px' }}>🔥</span>
          <h2 style={{
            color: 'white',
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            FlameEye AI
          </h2>
        </div>

        {/* Sensör Verileri Bölümü */}
        <section>
          <h3 style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
            Environmental Sensors
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <div style={{ background: '#1A1A24', padding: '10px', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>TEMP</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#f47b25' }}>{currentData.temp}°C</p>
            </div>
            <div style={{ background: '#1A1A24', padding: '10px', borderRadius: '8px', textAlign: 'center', border: '1px solid #333' }}>
              <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>WIND</p>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{currentData.wind} km/h</p>
            </div>
          </div>
        </section>

        {/* Canlı Uyarılar Bölümü */}
        <section style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>
            Live Alerts
          </h3>
          {incidents.map(incident => (
            <div key={incident.id} style={{
              borderLeft: '4px solid #f47b25',
              padding: '12px',
              background: 'rgba(244,123,37,0.05)',
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>{incident.severity} Alert</p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#ccc' }}>{incident.id} | {incident.location}</p>
            </div>
          ))}
        </section>
      </aside>

      {/* Sağ Ana Panel (Harita) */}
      <main style={{ flex: 1, position: 'relative' }}>
        <header style={{
          padding: '15px 30px',
          background: '#252836',
          display: 'flex',
          justifyContent: 'flex-end',
          borderBottom: '1px solid #493222'
        }}>
          <span style={{ color: '#4ade80', fontSize: '13px', fontWeight: '500' }}>
            ● Real-time connection active
          </span>
        </header>

        {/* Harita Alanı */}
        <div className="map-view" style={{
          height: 'calc(100% - 60px)',
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAS2weW67kmm5i8igjDVlJWuHGKJHEIxSPeMNOKSxh6NvndjxoVd7wjSgRuCOZPYwjy1LFiOdoGErvr3pY1airbBPRr40YGbiDHfLicVO4dIREmIDcbGrFSmGLMpee0g8aN8wD2iyxi-FRktvMOhwT6bt8uvoWu7kfL7GvnEFxV_MkALi_N_GJqvbnd1UGQ0srLQ_IyxVD8y0rqA3XxZsnT0haD7KRAXMA5xaELhxlzyYoVpTqvsxVlt1FVoGg2lJ29N4P1d6dPWfNG')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>

          {/* Harita Üzerindeki Olay Kartı */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '45%',
            background: 'rgba(37, 40, 54, 0.95)',
            padding: '15px',
            borderRadius: '12px',
            border: '2px solid #f47b25',
            width: '240px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ margin: 0, color: '#f47b25' }}>{incidents[0].id}</h4>
              <span style={{ fontSize: '10px', background: 'red', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                AI DETECTED
              </span>
            </div>
            <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#eee' }}>
              Confidence: %{incidents[0].confidence}
            </p>
            <button
              onClick={onShowDetails}
              style={{
                width: '100%',
                padding: '10px',
                background: '#f47b25',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                color: 'white',
                cursor: 'pointer',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = '#e06a1a'}
              onMouseOut={(e) => e.target.style.background = '#f47b25'}
            >
              Analyze Incident
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;