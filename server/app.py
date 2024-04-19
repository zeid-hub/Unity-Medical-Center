from config import app, db, api, Resource, make_response, jsonify, request
from models import User, Doctor, Patient, Nurse, Appointment, Department

class Home(Resource):
    def get(self):
        response = {
            "message": "Welcome to our Unity Medical Centre"
        }
        return make_response(jsonify(response), 200)
    
api.add_resource(Home, "/")

class AddUser(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'])
        new_user.set_password(data['password'])  # Use set_password method to hash the password
        db.session.add(new_user)
        db.session.commit()
        return make_response({"message": "User Created Successfully"}, 201)

api.add_resource(AddUser, "/adduser")

class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user and user.authenticate(data['password']):
            return make_response(jsonify({"message": "Login Successful"}), 200)
        else:
            return make_response(jsonify({"error": "Invalid Credentials"}), 403)
            
api.add_resource(LoginUser, "/login")


class Doctors(Resource):
    def get(self):
        doctors = Doctor.query.all()
        my_doctor_lists = [
            {
                "id": doctor.id,
                "name": doctor.name,
                "license_number": doctor.license_number,
                "specialization": doctor.specialization,
                "language_spoken": doctor.language_spoken,
                "department_name": doctor.department_name,
                "department_id": doctor.department.id if doctor.department else None
            }
            for doctor in doctors
        ]
        response = make_response(jsonify(my_doctor_lists), 200)
        return response

    
    def post(self):
        data = request.get_json()
        
        new_doctor = Doctor(
            id=data["id"],
            name=data["name"],
            license_number=data["license_number"],
            specialization=data["specialization"],
            language_spoken=data["language_spoken"],
            department_name=data["department_name"],
            department_id=data["department_id"]
        )
        db.session.add(new_doctor)
        db.session.commit()
        response = {"message": "Your doctor has been added successfully"}
        return make_response(jsonify(response), 201)

api.add_resource(Doctors, "/doctors")

class DoctorById(Resource):
    def get(self, id):
        doctor = Doctor.query.get(id)
        if doctor:
            response = {
                "id": doctor.id,
                "name": doctor.name,
                "license_number": doctor.license_number,
                "specialization": doctor.specialization,
                "language_spoken": doctor.language_spoken,
                "department_name": doctor.department_name,
                "department_id": doctor.department.id
            }
            return make_response(jsonify(response), 200)
        else:
            return make_response(jsonify({"error": "Doctor not found"}), 404)

    def patch(self, id):
        doctor = Doctor.query.get(id)
        if doctor:
            data = request.get_json()
            for key, value in data.items():
                setattr(doctor, key, value)
            db.session.commit()
            return make_response(jsonify(doctor.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Doctor not found"}), 404)

    def delete(self, id):
        doctor = Doctor.query.get(id)
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            return make_response(jsonify({"message": "Doctor deleted successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Doctor not found"}), 404)

api.add_resource(DoctorById, "/doctors/<int:id>")

class Nurses(Resource):
    def get(self):
        nurses = Nurse.query.all()
        my_nurse_lists = [
            {
                "id": nurse.id,
                "name": nurse.name,
                "license_number": nurse.license_number,
                "language_spoken": nurse.language_spoken,
                "doctor_id": nurse.doctor_id,
                "department_id": nurse.department_id
            }
            for nurse in nurses
        ]
        response = make_response(jsonify(my_nurse_lists), 200)
        return response
    
    def post(self):
        data = request.get_json()
        
        new_nurse = Nurse(
            id=data["id"],
            name=data["name"],
            license_number=data["license_number"],
            language_spoken=data["language_spoken"],
            doctor_id=data["doctor_id"],
            department_id=data["department_id"]
        )
        db.session.add(new_nurse)
        db.session.commit()
        response = {"message": "Your nurse has been added successfully"}
        return make_response(jsonify(response), 201)

api.add_resource(Nurses, "/nurses")

class NurseById(Resource):
    def get(self, id):
        nurse = Nurse.query.get(id)
        if nurse:
            response = {
                "id": nurse.id,
                "name": nurse.name,
                "license_number": nurse.license_number,
                "language_spoken": nurse.language_spoken,
                "doctor_id": nurse.doctor_id,
                "department_id": nurse.department_id
            }
            return make_response(jsonify(response), 200)
        else:
            return make_response(jsonify({"error": "Nurse not found"}), 404)

    def patch(self, id):
        nurse = Nurse.query.get(id)
        if nurse:
            data = request.get_json()
            for key, value in data.items():
                setattr(nurse, key, value)
            db.session.commit()
            return make_response(jsonify(nurse.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Nurse not found"}), 404)

    def delete(self, id):
        nurse = Nurse.query.get(id)
        if nurse:
            db.session.delete(nurse)
            db.session.commit()
            return make_response(jsonify({"message": "Nurse deleted successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Nurse not found"}), 404)

api.add_resource(NurseById, "/nurses/<int:id>")

class Patients(Resource):
    def get(self):
        patients = Patient.query.all()
        my_patient_lists = [
            {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "contact": patient.contact,
                "diagnosis": patient.diagnosis,
                "bed_number": patient.bed_number,
                "doctor_id": patient.doctor_id,
            }
            for patient in patients
        ]
        response = make_response(jsonify(my_patient_lists), 200)
        return response
    
    def post(self):
        data = request.get_json()
        
        new_patient = Patient(
            id=data["id"],
            name=data["name"],
            age=data["age"],
            gender=data["gender"],
            contact=data["contact"],
            diagnosis=data["diagnosis"],
            bed_number=data["bed_number"],
            doctor_id=data["doctor_id"]
        )
        db.session.add(new_patient)
        db.session.commit()
        response = {"message": "Your patient has been added successfully"}
        return make_response(jsonify(response), 201)

api.add_resource(Patients, "/patients")

class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.get(id)
        if patient:
            response = {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "contact": patient.contact,
                "diagnosis": patient.diagnosis,
                "bed_number": patient.bed_number,
                "doctor_id": patient.doctor_id,
            }
            return make_response(jsonify(response), 200)
        else:
            return make_response(jsonify({"error": "Patient not found"}), 404)

    def patch(self, id):
        patient = Patient.query.get(id)
        if patient:
            data = request.get_json()
            for key, value in data.items():
                setattr(patient, key, value)
            db.session.commit()
            return make_response(jsonify(patient.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Patient not found"}), 404)

    def delete(self, id):
        patient = Patient.query.get(id)
        if patient:
            db.session.delete(patient)
            db.session.commit()
            return make_response(jsonify({"message": "Patient deleted successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Patient not found"}), 404)

api.add_resource(PatientById, "/patients/<int:id>")

class Appointments(Resource):
    def get(self):
        appointments = Appointment.query.all()
        my_appointment_lists = [
            {
                "id": appointment.id,
                "patient_name": appointment.patient_name,
                "reason": appointment.reason,
                "datetime": appointment.datetime,
                "doctor_name": appointment.doctor_name,
                "doctor_id": appointment.doctor_id,
            }
            for appointment in appointments
        ]
        response = make_response(jsonify(my_appointment_lists), 200)
        return response
    
    def post(self):
        data = request.get_json()
        
        new_appointment = Appointment(
            id=data["id"],
            patient_name=data["patient_name"],
            reason=data["reason"],
            doctor_name=data["doctor_name"],
            datetime=data["datetime"],
            doctor_id=data["doctor_id"]
        )
        db.session.add(new_appointment)
        db.session.commit()
        response = {"message": "Your Appointment has been scheduled successfully"}
        return make_response(jsonify(response), 201)

api.add_resource(Appointments, "/appointments")

class AppointmentById(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            response = {
                "id": appointment.id,
                "patient_name": appointment.patient_name,
                "reason": appointment.reason,
                "datetime": appointment.datetime,
                "doctor_name": appointment.doctor_name,
                "doctor_id": appointment.doctor_id,
            }
            return make_response(jsonify(response), 200)
        else:
            return make_response(jsonify({"error": "Appointment not found"}), 404)

    def patch(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            data = request.get_json()
            for key, value in data.items():
                setattr(appointment, key, value)
            db.session.commit()
            return make_response(jsonify(appointment.to_dict()), 200)
        else:
            return make_response(jsonify({"error": "Appointment not found"}), 404)

    def delete(self, id):
        appointment = Appointment.query.get(id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return make_response(jsonify({"message": "Appointment deleted successfully"}), 200)
        else:
            return make_response(jsonify({"error": "Appointment not found"}), 404)

api.add_resource(AppointmentById, "/appointments/<int:id>")

class Departments(Resource):
    def get(self):
        departments = Department.query.all()
        my_department_lists = [
            {
                "id": department.id,
                "name": department.name,
                "head_of_department": department.head_of_department,
                "number_of_patients": department.number_of_patients,
                "number_of_doctors": department.number_of_doctors
            }
            for department in departments
        ]
        response = make_response(
            jsonify(my_department_lists),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        new_department = Department(
            id = data["id"],
            name = data["name"],
            head_of_department = data["head_of_department"],
            number_of_patients = data["number_of_patients"],
            number_of_doctors = data["number_of_doctors"]
        )
        db.session.add(new_department)
        db.session.commit()
        response = {
            "message": "Your Department has been added successfully"
        }
        return make_response(
            jsonify(response),
            201
        )

api.add_resource(Departments, "/departments")

class DepartmentById(Resource):
    def get(self, id):
        departments_id = Department.query.all()
        departments_id_list = [
            {
                "id": department.id,
                "name": department.name,
                "head_of_department": department.head_of_department,
                "number_of_patients": department.number_of_patients,
                "number_of_doctors": department.number_of_doctors
            }
            for department in departments_id
        ]
        response = make_response(
            jsonify(departments_id_list),
            200
        )
        return response
    
    def patch(self, id):
        updating_department = Department.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updating_department, attr, request.form[attr])

        db.session.add(updating_department)
        db.session.commit()

        response = make_response(
            updating_department.to_dict,
            200
        )

        return response
    
    def delete(self, id):
        deleting_department = Department.query.filter_by(id=id).first()
        db.session.delete(deleting_department)
        db.session.commit()
        response = {
            "message": "Your Department has been deleted successfully"
        }
        return make_response(
            jsonify(response),
            200
        )
    
api.add_resource(DepartmentById, "/departments/<int:id>")
if __name__ == '__main__':
    app.run(port=5555, debug=True)
