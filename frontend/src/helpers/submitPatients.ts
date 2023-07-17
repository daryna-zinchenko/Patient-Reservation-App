import { instanceApi } from "../api/instances";

export async function submitPatients(newPatients: FormDataEntryValue) {

try {
  const response = await instanceApi.addPatients((newPatients as string).trim());
  return response;
} catch (error) {
  return {"error": error};
  };
};