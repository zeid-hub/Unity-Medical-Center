from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

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
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, plaintext_password):
        self._password_hash = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')

    def authenticate(self, plaintext_password):
        return bcrypt.check_password_hash(self.password_hash, plaintext_password)

    def __repr__(self):
        return f"<User {self.id}, {self.username}, {self._password_hash}>"

class TokenBlocklist(db.Model):
    __tablename__ = "token_blocklist"
    id=db.Column(db.Integer, primary_key=True)
    jti=db.Column(db.String, nullable=False, index=True)
    created_At = db.Column(db.String, nullable=False, )

    def __repr__(self):
        return f"<TokenBlocklist {self.id}, {self.jti}, {self.created_At}>"

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