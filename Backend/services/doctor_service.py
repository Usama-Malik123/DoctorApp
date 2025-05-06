from sqlalchemy.orm import Session
from repos import doctor_repo
from repos.dto import DoctorCreate

def get_all_doctors_service(db: Session):
    return doctor_repo.get_all_doctors(db)

def get_doctor_by_id_service(db: Session, doctor_id: int):
    return doctor_repo.get_doctor_by_id(db, doctor_id)

def create_doctor_service(db: Session, doctor_data: DoctorCreate):
    return doctor_repo.create_doctor(db, doctor_data)

def delete_doctor_service(db: Session, doctor_id: int):
    return doctor_repo.delete_doctor(db, doctor_id)
