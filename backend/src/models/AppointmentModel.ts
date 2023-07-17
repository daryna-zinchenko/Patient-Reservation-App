/* eslint-disable max-len */
import mongoose, { Schema } from 'mongoose';
import { IAppointment } from '../types';

const appointmentSchema: Schema = new Schema(
  {
    patientId: { type: Number, required: true },
    doctorId: { type: Number, required: true },
    appointmentTime: { type: String, default: null },
  },
  { timestamps: true },
);

const AppointmentModel = mongoose.model<IAppointment>('Appointment', appointmentSchema);

export { AppointmentModel };
export { IAppointment };
