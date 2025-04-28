from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.device_group import DeviceGroup
from pydantic import BaseModel

class DeviceGroupCreate(BaseModel):
    name: str
    id: int

router = APIRouter()

@router.post("/device_group/")
def create_device_group(device_group: DeviceGroupCreate, db: Session = Depends(get_db)):
    db_device_group = db.query(DeviceGroup).filter(DeviceGroup.id == device_group.id).first()
    new_device_group = DeviceGroup(name=device_group.name, id=device_group.id)
    db.add(new_device_group)
    db.commit()
    db.refresh(new_device_group)
    return new_device_group

