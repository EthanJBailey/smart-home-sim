from sqlalchemy import Column, Integer, String
from db import Base

class DeviceGroup(Base):
    __tablename__ = "device_group"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)