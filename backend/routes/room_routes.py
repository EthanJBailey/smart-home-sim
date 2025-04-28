from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from models.room import Room
from pydantic import BaseModel

class RoomCreate(BaseModel):
    name: str
    id: int

router = APIRouter()

@router.post("/room/")
def create_room(room: RoomCreate, db: Session = Depends(get_db)):
    db_device = db.query(Room).filter(Room.id == room.id).first()
    new_room = Room(name=room.name, id=room.id)
    db.add(new_room)
    db.commit()
    db.refresh(new_room)
    return new_room

