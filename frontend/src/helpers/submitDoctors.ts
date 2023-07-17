import { instanceApi } from "../api/instances";

export async function submitDoctors(newDoctors: FormDataEntryValue) {

try {
  const response = await instanceApi.addDoctors((newDoctors as string).trim());
  return response;
} catch (error) {
  return {"error": error};
  };
};