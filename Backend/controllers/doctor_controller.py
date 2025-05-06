from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services import doctor_service
from repos.dto import DoctorCreate, DoctorResponse
from typing import List
from logger_config.logger_config import logger  


router = APIRouter(prefix="/api/doctors", tags=["Doctors"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    logger.info("Fetching all doctors from the database.")  
    return doctor_service.get_all_doctors_service(db)

@router.get("/{doctor_id}", response_model=DoctorResponse)
def get_doctor_by_id(doctor_id: int, db: Session = Depends(get_db)):
    logger.info(f"Fetching doctor with ID {doctor_id}.") 
    doctor = doctor_service.get_doctor_by_id_service(db, doctor_id)
    if not doctor:
        logger.warning(f"Doctor with ID {doctor_id} not found!") 
        raise HTTPException(status_code=404, detail="Doctor not found!")
    return doctor

@router.post("/", response_model=DoctorResponse, status_code=201)
def add_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    logger.info(f"Adding new doctor: {doctor.email}")  
    return doctor_service.create_doctor_service(db, doctor)

@router.delete("/{doctor_id}")
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    logger.info(f"Attempting to delete doctor with ID {doctor_id}.")
    if not doctor_service.delete_doctor_service(db, doctor_id):
        logger.warning(f"Failed to delete doctor with ID {doctor_id}, not found!")
        raise HTTPException(status_code=404, detail="Doctor not found!")
    logger.success(f"Doctor with ID {doctor_id} deleted successfully.") 
    return {"message": "Doctor deleted successfully"}
