from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
import datetime

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)
    alarm_id = Column(String, unique=True, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    latitude = Column(Float)
    longitude = Column(Float)
    confidence = Column(Float)
    severity = Column(String, default="High")
    status = Column(String, default="Active") # Active, Acknowledged, False Alarm
    image_path = Column(String)