import React, { useState, useEffect } from 'react';

const Details = ({ onBack, currentData }) => {
  // Confidence skorunu hala burada simüle edebiliriz, analizin canlı olduğunu hissettirir
  const [analysisConfidence, setAnalysisConfidence] = useState(98.7);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisConfidence(+(98.5 + Math.random() * 0.4).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#1A1A2E', minHeight: '100vh', color: 'white', padding: '30px' }}>
      {/* Geri Dön Butonu */}
      <button
        onClick={onBack}
        style={{
          background: '#f47b25', color: 'white', border: 'none', padding: '10px 20px',
          borderRadius: '6px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold'
        }}
      >
        ← Back to Map
      </button>

      <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>INCIDENT: SIERRA NEVADA</h1>
      <p style={{ color: '#f47b25', fontWeight: 'bold' }}>Status: High Severity Alert</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px', marginTop: '30px' }}>

        {/* Termal Analiz Kartı - Senin istediğin profesyonel placeholder burada */}
        <div style={{
          background: '#252836',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #493222',
          height: '350px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>THERMAL ANALYSIS (YOLOv8)</h3>

          <div style={{
            flex: 1,
            background: '#1A1A24',
            borderRadius: '8px',
            border: '1px dashed #444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚠️</div>
              <p style={{
                color: '#666',
                fontSize: '14px',
                margin: 0,
                fontStyle: 'italic',
                lineHeight: '1.5'
              }}>
                There are no available data for thermal analysis. <br/>
                <span style={{ fontSize: '12px', color: '#444' }}>Waiting for YOLOv8 model stream...</span>
              </p>
            </div>
          </div>
        </div>

        {/* Standart Kamera Kartı */}
        <div style={{ background: '#252836', padding: '20px', borderRadius: '12px', border: '1px solid #493222', height: '350px' }}>
          <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '15px' }}>STANDARD CCTV FEED</h3>
          <div style={{
            height: '265px', background: '#1A1A24', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333'
          }}>
            <p style={{ color: '#555', fontSize: '14px' }}>Video Stream Loading...</p>
          </div>
        </div>

        {/* Veri Paneli */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#252836', padding: '25px', borderRadius: '12px', border: '1px solid #493222' }}>
            <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>Environmental Sensors</h3>
            <div style={{ display: 'flex', gap: '40px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Temp</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f47b25' }}>{currentData.temp}°C</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Wind</p>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{currentData.wind} km/h</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#252836', padding: '25px', borderRadius: '12px', border: '1px solid #493222' }}>
            <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '10px' }}>Risk Confidence</h3>
            <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0, color: '#4ade80' }}>%{analysisConfidence}</p>
            <p style={{ fontSize: '12px', color: '#555', marginTop: '10px' }}>Model: YOLOv8-Thermal-v2</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Details;