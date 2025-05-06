import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.database import Base
from models.doctor import Doctor

from controllers.doctor_controller import get_db


TEST_DATABASE_URL = "postgresql://postgres:Musawir@localhost:5432/testDoctor"
test_engine = create_engine(TEST_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    print("\nSetting up the test database...")
    Base.metadata.drop_all(bind=test_engine)
    Base.metadata.create_all(bind=test_engine)
    yield
    print("\nTearing down the test database...")
    Base.metadata.drop_all(bind=test_engine)


#   Add a Doctor and Verify in DB
def test_add_doctor_to_db():
    db = TestingSessionLocal()
    new_doctor = Doctor(
        name="Dr. John Doe",
        email="john@example.com",
        speciality="Cardiologist",
        experience="10 years",
        fees=5000,
        degree="MBBS",
        address1="123 Street",
        address2="Suite 100",
        about="Experienced doctor"
    )
    db.add(new_doctor)
    db.commit()

    # Check if the doctor exists in the database
    doctor_in_db = db.query(Doctor).filter_by(email="john@example.com").first()
    assert doctor_in_db is not None
    assert doctor_in_db.name == "Dr. John Doe"
    db.close()


#  Fetch Doctor by ID
def test_get_doctor_by_id_db():
    db = TestingSessionLocal()
    doctor = db.query(Doctor).filter_by(email="john@example.com").first()
    assert doctor is not None
    assert doctor.id is not None
    db.close()


#  Delete a Doctor and Verify Deletion
def test_delete_doctor_from_db():
    db = TestingSessionLocal()
    doctor = db.query(Doctor).filter_by(email="john@example.com").first()
    assert doctor is not None 

    db.delete(doctor)
    db.commit()

    # Verify the doctor is removed
    deleted_doctor = db.query(Doctor).filter_by(email="john@example.com").first()
    assert deleted_doctor is None
    db.close()
