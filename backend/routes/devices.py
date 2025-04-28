from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.user import Device
from pydantic import BaseModel

class DeviceCreate(BaseModel):
    name: str
    id: int

router = APIRouter()

@router.post("/devices/")
def create_device(device: DeviceCreate, db: Session = Depends(get_db)):
    db_device = db.query(Device).filter(Device.id == Device.id)
    new_device = Device(name=device.name, id=device.id)
    db.add(new_device)
    db.commit()
    db.refresh(new_device)
    return new_device
