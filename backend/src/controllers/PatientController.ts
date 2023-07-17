/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { PatientModel, IPerson } from './../models/PersonModel';

export async function createPatients(req: Request, res: Response) {
  const newPatients: string = req.body;

  const duplicatesPatients: string[] = [];
  const wrongFormatPatients: string[] = [];
  const successfulPatients: IPerson[] = [];

  const patients = (newPatients)
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
    const name = rest.shift();
    const dateOfBirth = rest.shift();

    const validatedPatient = new PatientModel({
      id, hoursAvailable, name, dateOfBirth,
    });
    const validationError = validatedPatient.validateSync();

    if (validationError) {
      wrongFormatPatients.push(JSON.stringify(patient));
      continue;
    }

    const existingPatient = await PatientModel.findOne({ id });

    if (existingPatient) {
      duplicatesPatients.push(JSON.stringify(patient));
    } else {
      successfulPatients.push({
        id: parseInt(id), hoursAvailable, name, dateOfBirth,
      });
    }
  }

  const response = {
    successfulPatients: successfulPatients,
    wrongFormatPatients: wrongFormatPatients,
    duplicatesPatients: duplicatesPatients,
  };

  try {
    await PatientModel.insertMany(successfulPatients);
    res.send(response);
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
}

export const deleteAllPatients = async(res: express.Response) => {
  try {
    await PatientModel.deleteMany();
    res.statusCode = 200;
    res.send();
  } catch (error) {
    res.statusCode = 500;
    res.send(error);
  }
};
