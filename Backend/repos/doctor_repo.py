from sqlalchemy.orm import Session
from models.doctor import Doctor
from repos.dto import DoctorCreate

def get_all_doctors(db: Session):
    return db.query(Doctor).all()

def get_doctor_by_id(db: Session, doctor_id: int):
    return db.query(Doctor).filter(Doctor.id == doctor_id).first()

def create_doctor(db: Session, doctor_data: DoctorCreate):
    new_doctor = Doctor(**doctor_data.model_dump())
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor

def delete_doctor(db: Session, doctor_id: int):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if doctor:
        db.delete(doctor)
        db.commit()
        return True
    return False
