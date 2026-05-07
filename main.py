from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, database

# Create the database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="FlameEye Backend API")

# Configure CORS so your React frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Adjust to your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/incidents/", response_model=schemas.Incident)
def create_incident(incident: schemas.IncidentCreate, db: Session = Depends(database.get_db)):
    """Called by the AI Detector module when a fire is confirmed (> 0.45 confidence)"""
    db_incident = models.Incident(**incident.model_dump())
    db.add(db_incident)
    db.commit()
    db.refresh(db_incident)
    return db_incident

@app.get("/api/incidents/", response_model=list[schemas.Incident])
def read_incidents(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    """Called by the React Dashboard to load the Live Alerts feed"""
    incidents = db.query(models.Incident).order_by(models.Incident.timestamp.desc()).offset(skip).limit(limit).all()
    return incidents

@app.put("/api/incidents/{incident_id}/status", response_model=schemas.Incident)
def update_incident_status(incident_id: int, status_update: schemas.IncidentUpdate, db: Session = Depends(database.get_db)):
    """Called by the React Dashboard when operator clicks 'Mark False Alarm' or 'Dispatch Team'"""
    db_incident = db.query(models.Incident).filter(models.Incident.id == incident_id).first()
    if db_incident is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    db_incident.status = status_update.status
    db.commit()
    db.refresh(db_incident)
    return db_incident