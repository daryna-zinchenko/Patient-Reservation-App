import mongoose, { Schema } from 'mongoose';
import { IPerson } from '../types';

const personSchema: Schema = new Schema(
  {
    id: { type: Number, required: true },
    hoursAvailable: { type: String, required: true, validate: isValidHours },
    name: { type: String, validate: isValidName },
    dateOfBirth: { type: String, validate: isValidDateOfBirth },
  },
  { timestamps: true },
);

function isValidHours(hours: string): boolean {
  let [start, end] = hours.trim().split('-') as string[] | number[];

  start = parseInt(start as string);
  end = parseInt(end as string);

  if (start < 0 || end < 0 || start > 23 || end > 23 || start > end) {
    return false;
  }

  return true;
}

function isValidName(name: string): boolean {
  const regex = /^[A-Za-z]+( [A-Za-z]+)?$/;

  return regex.test(name.trim());
}

function isValidDateOfBirth(dateOfBirth: string): boolean {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[0-2])\.\d{4}$/;

  return regex.test(dateOfBirth.trim());
}

const PatientModel = mongoose.model<IPerson>('Patient', personSchema);
const DoctorModel = mongoose.model<IPerson>('Doctor', personSchema);

export { PatientModel, DoctorModel };
export { IPerson };
