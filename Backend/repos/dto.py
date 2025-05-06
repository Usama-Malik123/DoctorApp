from pydantic import BaseModel, EmailStr, Field, ConfigDict

class DoctorCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    speciality: str = Field(..., min_length=3, max_length=50)
    experience: str
    fees: int = Field(..., gt=0)
    degree: str
    address1: str
    address2: str = None
    about: str = None

class DoctorResponse(DoctorCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)  
