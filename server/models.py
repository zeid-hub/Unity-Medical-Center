from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Define association table
appointment_patient_association = db.Table(
    'appointment_patient_association',
    db.Column('appointment_id', db.Integer, db.ForeignKey('appointments.id')),
    db.Column('patient_id', db.Integer, db.ForeignKey('patients.id'))
)

nurse_patient_association = db.Table(
    'nurse_patient_association',
    db.Column('nurse_id', db.Integer, db.ForeignKey('nurses.id')),
    db.Column('patient_id', db.Integer, db.ForeignKey('patients.id'))
)

class Doctor(db.Model, SerializerMixin):
    __tablename__ = "doctors"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    license_number = db.Column(db.String)
    specialization = db.Column(db.String)
    language_spoken = db.Column(db.String)
    department_name = db.Column(db.String)
    department_id = db.Column(db.Integer(), db.ForeignKey("departments.id"))

    # Adding relationships
    patients = db.relationship('Patient', back_populates='doctor')
    nurses = db.relationship('Nurse', back_populates='doctor')
    appointments = db.relationship('Appointment', back_populates='doctor')
    department_doctors = db.relationship("Department", back_populates="doctors")

    def __repr__(self):
        return f"<Doctor {self.id}, {self.name}, {self.license_number}, {self.specialization}, {self.language_spoken}, {self.department}, {self.department_id}>"
    

class Nurse(db.Model, SerializerMixin):
    __tablename__ = "nurses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    license_number = db.Column(db.String)
    language_spoken = db.Column(db.String)
    department = db.Column(db.String)
    doctor_id = db.Column(db.Integer(), db.ForeignKey("doctors.id"))
    department_id = db.Column(db.Integer(), db.ForeignKey("departments.id"))

    # Adding relationships
    doctor = db.relationship('Doctor', back_populates='nurses')
    patients = db.relationship('Patient', secondary=nurse_patient_association, back_populates='nurses')
    department = db.relationship("Department", back_populates="nurses")

    def __repr__(self):
        return f"<Nurse {self.id}, {self.name}, {self.license_number}, {self.language_spoken}, {self.department}, {self.doctor_id}, {self.department_id}>"
    

class Patient(db.Model, SerializerMixin):
    __tablename__ = "patients"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    gender = db.Column(db.String)
    contact = db.Column(db.String)
    diagnosis = db.Column(db.String)
    bed_number = db.Column(db.String)
    doctor_id = db.Column(db.Integer(), db.ForeignKey("doctors.id"))

    # Adding relationships
    doctor = db.relationship('Doctor', back_populates='patients')
    # appointments = db.relationship('Appointment', secondary=appointment_patient_association, backref='patient_appointments_relation')
    appointments = db.relationship('Appointment', secondary=appointment_patient_association, back_populates='patients')
    nurses = db.relationship('Nurse', secondary=nurse_patient_association, back_populates='patients')
   
    

    def __repr__(self):
        return f"<Patient {self.id}, {self.name}, {self.age}, {self.gender}, {self.contact}, {self.diagnosis}, {self.bed_number}, {self.doctor_id}>"


class Appointment(db.Model, SerializerMixin):
    __tablename__ = "appointments"

    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String)
    reason = db.Column(db.String)
    doctor_name = db.Column(db.String)
    datetime = db.Column(db.DateTime)
    doctor_id = db.Column(db.Integer(), db.ForeignKey("doctors.id"))

    #Adding relationships
    doctor = db.relationship('Doctor', back_populates='appointments')
    # patients = db.relationship('Patient', secondary=appointment_patient_association, backref='appointment_patients_relation')
    patients = db.relationship('Patient', secondary=appointment_patient_association, back_populates='appointments')

    def __repr__(self):
        return f"<Appointment {self.id}, {self.patient_name}, {self.reason}, {self.doctor_name}, {self.datetime}, {self.doctor_id}, {self.patient_id}>"



class Department(db.Model, SerializerMixin):
    __tablename__ = "departments"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    head_of_department = db.Column(db.String)
    number_of_patients = db.Column(db.Integer)
    number_of_doctors = db.Column(db.Integer)

    # Adding relationships
    doctors = db.relationship("Doctor", backref="department")
    nurses = db.relationship("Nurse", back_populates="department")

    def __repr__(self):
        return f"<Department {self.id}, {self.name}, {self.head_of_department}, {self.number_of_patients}, {self.number_of_doctors}>"