from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class IncidentBase(BaseModel):
    alarm_id: str
    latitude: float
    longitude: float
    confidence: float
    severity: str
    image_path: Optional[str] = None

class IncidentCreate(IncidentBase):
    pass

class IncidentUpdate(BaseModel):
    status: str

class Incident(IncidentBase):
    id: int
    timestamp: datetime
    status: str

    class Config:
        from_attributes = True