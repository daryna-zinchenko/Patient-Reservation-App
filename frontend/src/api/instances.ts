import { Appointment } from '../types/Appointment';
import { client } from './fetchClient';

const addPatients = (patients: string) => {
  return client.post<string>('/patients', patients);
};

const addDoctors = (doctors: string) => {
  return client.post<string>('/doctors', doctors);
};

const addAppointments = (appointments: string) => {
  return client.post<string>('/appointments', appointments);
};

const getAppointments = () => {
  return client.get<Appointment[]>(`/appointments`);
};

const deleteAppointment = (id: string) => {
  return client.delete<string>(`/appointments/${id}`)
    .then(Boolean);
};

const updateAppointment = (id: string, newAppointment: Appointment) => {
  return client.patch<Appointment>(`/appointments/${id}`, newAppointment);
};

const clearData = () => {
  client.delete<string>(`/patients`)
  client.delete<string>(`/doctors`)
  client.delete<string>(`/appointments`)
};

export const instanceApi = {
  addPatients,
  addDoctors,
  addAppointments,
  getAppointments,
  deleteAppointment,
  updateAppointment,
  clearData
};