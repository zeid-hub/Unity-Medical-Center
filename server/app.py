from config import app, db, api, Resource, make_response, jsonify, request
from models import User, Doctor, Patient, Nurse, Appointment, Department

class Home(Resource):
    def get(self):
        response = {
            "message": "Welcome to our Unity Medical Centre"
        }

        return make_response(
            jsonify(response),
            200
        )
    
api.add_resource(Home, "/")

class AddUser(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'])
        new_user._password_hash = data['password']
        db.session.add(new_user)
        db.session.commit()
        return make_response({"message":"USer Created Successfully"},201)

api.add_resource(AddUser, "/adduser")

class LoginUser(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            return make_response(
                jsonify({"message":"Login Successful"}),
                200
            )
        else:
            return make_response(
                jsonify({"error":"You are not the User"}),
                403
            )
            
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
                "department_id": doctor.department.id
            }
            for doctor in doctors
        ]
        response = make_response(
            jsonify(my_doctor_lists),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        new_doctor = Doctor(
            id = data["id"],
            name = data["name"],
            license_number = data["license_number"],
            specialization = data["specialization"],
            language_spoken = data["language_spoken"],
            department_name = data["department_name"],
            department_id = data["department_id"]
        )
        db.session.add(new_doctor)
        db.session.commit()
        response = {
            "message": "Your doctor has been added successfully"
        }
        return make_response(
            jsonify(response),
            201
        )

api.add_resource(Doctors, "/doctors")

class DoctorById(Resource):
    def get(self, id):
        doctors_id = Doctor.query.all()
        doctors_id_list = [
            {
                "id": doctor.id,
                "name": doctor.name,
                "license_number": doctor.license_number,
                "specialization": doctor.specialization,
                "language_spoken": doctor.language_spoken,
                "department_name": doctor.department_name,
                "department_id": doctor.department.id
            }
            for doctor in doctors_id
        ]
        response = make_response(
            jsonify(doctors_id_list),
            200
        )
        return response
    
    def patch(self, id):
        updating_doctor = Doctor.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updating_doctor, attr, request.form[attr])

        db.session.add(updating_doctor)
        db.session.commit()

        response = make_response(
            updating_doctor.to_dict,
            200
        )

        return response
    
    def delete(self, id):
        deleting_doctor = Doctor.query.filter_by(id=id).first()
        db.session.delete(deleting_doctor)
        db.session.commit()
        response = {
            "message": "Your doctor has been deleted successfully"
        }
        return make_response(
            jsonify(response),
            200
        )
    
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
                "doctor_id": nurse.doctor.id if nurse.doctor else None,
                "department_id": nurse.department.id if nurse.department else None
            }
            for nurse in nurses
        ]
        response = make_response(
            jsonify(my_nurse_lists),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        new_nurse = Nurse(
            id = data["id"],
            name = data["name"],
            license_number = data["license_number"],
            language_spoken = data["language_spoken"],
            department_id = data["department_id"]
        )
        db.session.add(new_nurse)
        db.session.commit()
        response = {
            "message": "Your nurse has been added successfully"
        }
        return make_response(
            jsonify(response),
            201
        )

api.add_resource(Nurses, "/nurses")

class NurseById(Resource):
    def get(self, id):
        nurses_id = Doctor.query.all()
        nurses_id_list = [
            {
                "id": nurse.id,
                "name": nurse.name,
                "license_number": nurse.license_number,
                "language_spoken": nurse.language_spoken,
                "department_id": nurse.department.id
            }
            for nurse in nurses_id
        ]
        response = make_response(
            jsonify(nurses_id_list),
            200
        )
        return response
    
    def patch(self, id):
        updating_nurse = Nurse.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updating_nurse, attr, request.form[attr])

        db.session.add(updating_nurse)
        db.session.commit()

        response = make_response(
            updating_nurse.to_dict,
            200
        )

        return response
    
    def delete(self, id):
        deleting_nurse = Nurse.query.filter_by(id=id).first()
        db.session.delete(deleting_nurse)
        db.session.commit()
        response = {
            "message": "Your nurse has been deleted successfully"
        }
        return make_response(
            jsonify(response),
            200
        )
    
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
                "doctor_id" : patient.doctor.id,
            }
            for patient in patients
        ]
        response = make_response(
            jsonify(my_patient_lists),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        new_patient = Patient(
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
        response = {
            "message": "Your patient has been added successfully"
        }
        return make_response(
            jsonify(response),
            201
        )

api.add_resource(Patients, "/patients")

class PatientById(Resource):
    def get(self, id):
        patients_id = Patient.query.all()
        patients_id_list = [
            {
                "id": patient.id,
                "name": patient.name,
                "age": patient.age,
                "gender": patient.gender,
                "contact": patient.contact,
                "diagnosis": patient.diagnosis,
                "bed_number": patient.bed_number,
                "doctor_id" : patient.doctor.id,
            }
            for patient in patients_id
        ]
        response = make_response(
            jsonify(patients_id_list),
            200
        )
        return response
    
    def patch(self, id):
        updating_patient = Patient.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updating_patient, attr, request.form[attr])

        db.session.add(updating_patient)
        db.session.commit()

        response = make_response(
            updating_patient.to_dict,
            200
        )

        return response
    
    def delete(self, id):
        deleting_patient = Patient.query.filter_by(id=id).first()
        db.session.delete(deleting_patient)
        db.session.commit()
        response = {
            "message": "Your patient has been deleted successfully"
        }
        return make_response(
            jsonify(response),
            200
        )
    
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
                "doctor_id" : appointment.doctor.id,
            }
            for appointment in appointments
        ]
        response = make_response(
            jsonify(my_appointment_lists),
            200
        )
        return response
    
    def post(self):
        data = request.get_json()
        
        new_appointment = Appointment(
            id = data["id"],
            patient_name = data["patient_name"],
            reason = data["reason"],
            doctor_name = data["doctor_name"],
            datetime = data["datetime"],
            doctor_id = data["doctor_id"]
        )
        db.session.add(new_appointment)
        db.session.commit()
        response = {
            "message": "Your Appointment has been scheduled successfully"
        }
        return make_response(
            jsonify(response),
            201
        )

api.add_resource(Appointments, "/appointments")

class AppointmentById(Resource):
    def get(self, id):
        appointments_id = Appointment.query.all()
        appointments_id_list = [
            {
                "id": appointment.id,
                "patient_name": appointment.patient_name,
                "reason": appointment.reason,
                "datetime": appointment.datetime,
                "doctor_name": appointment.doctor_name,
                "doctor_id" : appointment.doctor.id,
            }
            for appointment in appointments_id
        ]
        response = make_response(
            jsonify(appointments_id_list),
            200
        )
        return response
    
    def patch(self, id):
        updating_appointment = Appointment.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(updating_appointment, attr, request.form[attr])

        db.session.add(updating_appointment)
        db.session.commit()

        response = make_response(
            updating_appointment.to_dict,
            200
        )

        return response
    
    def delete(self, id):
        deleting_appointment = Appointment.query.filter_by(id=id).first()
        db.session.delete(deleting_appointment)
        db.session.commit()
        response = {
            "message": "Your Appointment has been deleted successfully"
        }
        return make_response(
            jsonify(response),
            200
        )
    
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