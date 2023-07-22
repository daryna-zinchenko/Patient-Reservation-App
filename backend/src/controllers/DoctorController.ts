/* eslint-disable max-len */
/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { DoctorModel, IPerson } from './../models/PersonModel';

export async function createDoctors(req: Request, res: Response) {
  const newDoctors: string = req.body;
  const duplicatesDoctors: string[] = [];
  const wrongFormatDoctors: string[] = [];
  const successfulDoctors: string[] = [];
  const doctorsToInsert: IPerson[] = [];

  const doctors = (newDoctors as string)
    .trim()
    .split('\n')
    .map((doctor: string) => {
      const parts = doctor.trim().split(',');

      if (parts.length > 4) {
        wrongFormatDoctors.push(doctor);

        return null;
      }

      return parts;
    })
    .filter(v => v !== null);

  for (const doctor of (doctors as string[][])) {
    const [id, hoursAvailable, ...rest] = doctor;
    const pattern = /^[A-Za-z\s]+$/;
    let name;

    if (pattern.test(rest[0])) {
      name = rest.shift();
    }

    const dateOfBirth = rest.shift();

    const validatedDoctor = new DoctorModel({
      id, hoursAvailable, name, dateOfBirth,
    });
    const validationError = validatedDoctor.validateSync();

    if (validationError) {
      wrongFormatDoctors.push(doctor.join(','));
      continue;
    }

    const existingDoctor = await DoctorModel.findOne({ id });

    if (existingDoctor) {
      duplicatesDoctors.push(doctor.join(','));
    } else {
      successfulDoctors.push(doctor.join(','));

      doctorsToInsert.push({
        id: parseInt(id), hoursAvailable, name, dateOfBirth,
      });
    }
  }

  const response = {
    successfulDoctors: successfulDoctors.join('\n'),
    wrongFormatDoctors: wrongFormatDoctors.join('\n'),
    duplicatesDoctors: duplicatesDoctors.join('\n'),
  };

  try {
    await DoctorModel.insertMany(doctorsToInsert);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }

  console.log('response', response);
}

export const deleteAllDoctors = async(res: Response) => {
  try {
    await DoctorModel.deleteMany();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
