from sqlalchemy import Column, Integer, String
from db.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    speciality = Column(String, nullable=False)
    experience = Column(String, nullable=False)
    fees = Column(Integer, nullable=False)
    degree = Column(String, nullable=False)
    address1 = Column(String, nullable=False)
    address2 = Column(String, nullable=True)
    about = Column(String, nullable=True)
