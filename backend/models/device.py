from sqlalchemy import Column, Integer, String
from db import Base

class Device(Base):
    __tablename__ = "device"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)


