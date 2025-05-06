import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from db.database import Base
from controllers.doctor_controller import get_db

#  Use a separate test database
TEST_DATABASE_URL = "postgresql://postgres:Musawir@localhost:5432/testDoctor"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)

#  Override DB dependency for test isolation
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

#  Authentication Tokens 
ACCESS_TOKEN = "fake-token"
HEADERS = {"Authorization": f"Bearer {ACCESS_TOKEN}"}

@pytest.fixture(scope="module", autouse=True)
def setup_database():
    print("\nSetting up the test database...")
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    print("\nTearing down the test database...")
    Base.metadata.drop_all(bind=test_engine)


#  Test Health Check Endpoint
def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "API is running"}


#  Test Adding a Doctor 
def test_add_doctor():
    doctor_data = {
        "name": "Dr. John Doe",
        "email": "john@example.com",
        "speciality": "Cardiologist",
        "experience": "10 years",
        "fees": 5000,
        "degree": "MBBS",
        "address1": "123 Street",
        "address2": "Suite 100",
        "about": "Experienced doctor"
    }
    response = client.post("/api/doctors/", json=doctor_data, headers=HEADERS)
    assert response.status_code == 201
    assert response.json()["name"] == "Dr. John Doe"


#  Test Adding a Doctor 
def test_add_doctor_missing_fields():
    doctor_data = {
        "name": "Dr. Jane",
        "email": "jane@example.com"
        
    }
    response = client.post("/api/doctors/", json=doctor_data, headers=HEADERS)
    assert response.status_code == 422  


#  Test Fetching All Doctors
def test_get_doctors():
    response = client.get("/api/doctors/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


#  Test Fetching a Doctor by ID
def test_get_doctor_by_id():
    response = client.get("/api/doctors/1")
    assert response.status_code == 200
    assert "name" in response.json()


#  Test Fetching a Non-Existent Doctor
def test_get_non_existent_doctor():
    response = client.get("/api/doctors/9999")
    assert response.status_code == 404
    assert "Doctor not found" in response.json().get("detail", "")


#  Test Deleting a Doctor
def test_delete_doctor():
    response = client.delete("/api/doctors/1", headers=HEADERS)
    assert response.status_code == 200
    assert response.json() == {"message": "Doctor deleted successfully"}


#  Test Deleting a Non-Existent Doctor
def test_delete_non_existent_doctor():
    response = client.delete("/api/doctors/9999", headers=HEADERS)
    assert response.status_code == 404
    assert "Doctor not found" in response.json().get("detail", "")


#  Test Unauthorized Access
def test_unauthorized_access():
    response = client.post("/api/doctors/", json={"name": "Dr. Unauthorized"})
    assert response.status_code == 401  
    assert "Not authenticated" in response.json().get("detail", "")
