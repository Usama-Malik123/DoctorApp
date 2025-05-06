from pydantic import BaseModel, EmailStr, Field

class DoctorCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    speciality: str = Field(..., min_length=3, max_length=50)
    experience: str
    fees: int = Field(..., gt=0)  # Fees must be greater than 0
    degree: str
    address1: str
    address2: str = None
    about: str = None

class Doctor(DoctorCreate):
    id: int
    class Config:
        orm_mode = True
