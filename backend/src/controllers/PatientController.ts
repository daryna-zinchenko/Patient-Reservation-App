/* eslint-disable max-len */
/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { PatientModel, IPerson } from './../models/PersonModel';

export async function createPatients(req: Request, res: Response) {
  const newPatients: string = req.body;
  const duplicatesPatients: string[] = [];
  const wrongFormatPatients: string[] = [];
  const successfulPatients: string[] = [];
  const patientsToInsert: IPerson[] = [];

  const patients = (newPatients as string)
    .trim()
    .split('\n')
    .map((patient: string) => {
      const parts = patient.trim().split(',');

      if (parts.length > 4) {
        wrongFormatPatients.push(patient);

        return null;
      }

      return parts;
    })
    .filter(v => v !== null);

  for (const patient of (patients as string[][])) {
    const [id, hoursAvailable, ...rest] = patient;
    const pattern = /^[A-Za-z\s]+$/;
    let name;

    if (pattern.test(rest[0])) {
      name = rest.shift();
    }

    const dateOfBirth = rest.shift();

    const validatedPatient = new PatientModel({
      id, hoursAvailable, name, dateOfBirth,
    });
    const validationError = validatedPatient.validateSync();

    if (validationError) {
      wrongFormatPatients.push(patient.join(','));
      continue;
    }

    const existingPatient = await PatientModel.findOne({ id });

    if (existingPatient) {
      duplicatesPatients.push(patient.join(','));
    } else {
      successfulPatients.push(patient.join(','));

      patientsToInsert.push({
        id: parseInt(id), hoursAvailable, name, dateOfBirth,
      });
    }
  }

  const response = {
    successfulPatients: successfulPatients.join('\n'),
    wrongFormatPatients: wrongFormatPatients.join('\n'),
    duplicatesPatients: duplicatesPatients.join('\n'),
  };

  try {
    await PatientModel.insertMany(patientsToInsert);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }

  console.log('response', response);
}

export const deleteAllPatients = async(res: express.Response) => {
  try {
    await PatientModel.deleteMany();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
