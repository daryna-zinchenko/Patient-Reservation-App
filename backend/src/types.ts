export interface IPerson {
  id: number;
  hoursAvailable: string;
  name?: string;
  dateOfBirth?: string;
}

export interface IAppointment {
   _id?: string;
  patientId: string;
  doctorId: string;
  appointmentTime?: string;
}
