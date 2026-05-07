from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models
import schemas
import database

# Veritabanı tablolarını uygulama başlarken oluştur
# Bu satır models.py içindeki sınıfları veritabanına tablo olarak basar
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title="FlameEye Backend API",
    description="Wildfire Detection System Central API",
    version="1.0.0"
)

# CORS Ayarları - React frontend'in API'ye erişebilmesi için şart
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ENDPOINTS ---

@app.get("/")
def root():
    """API'nin hayatta olup olmadığını kontrol etmek için."""
    return {"status": "FlameEye API is running", "docs": "/docs"}

@app.post("/api/incidents", response_model=schemas.Incident, status_code=201)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(database.get_db)):
    """
    YOLO Dedektörü bir yangın bulduğunda bu endpoint'e POST isteği atar.
    """
    try:
        db_incident = models.Incident(**incident.model_dump())
        db.add(db_incident)
        db.commit()
        db.refresh(db_incident)
        return db_incident
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Database error: {str(e)}")

@app.get("/api/incidents", response_model=list[schemas.Incident])
def read_incidents(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    """
    Dashboard (React) açıldığında tüm yangınları listeler.
    """
    incidents = db.query(models.Incident) \
        .order_by(models.Incident.timestamp.desc()) \
        .offset(skip) \
        .limit(limit) \
        .all()
    return incidents

@app.put("/api/incidents/{incident_id}/status", response_model=schemas.Incident)
def update_incident_status(incident_id: int, status_update: schemas.IncidentUpdate,
                           db: Session = Depends(database.get_db)):
    """
    Bir alarmın durumunu (Aktif/Kontrol Edildi) değiştirmek için.
    """
    db_incident = db.query(models.Incident).filter(models.Incident.id == incident_id).first()
    if not db_incident:
        raise HTTPException(status_code=404, detail="Incident not found")

    db_incident.status = status_update.status
    db.commit()
    db.refresh(db_incident)
    return db_incident