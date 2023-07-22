import React, { useState } from "react";
import "./DataUploader.scss";
import { Button } from "../Button";
import { DataArea } from "../DataArea";
import { instanceApi } from "../../api/instances";
import { Popup } from "../Popup";
import { submitPatients } from "../../helpers/submitPatients";
import { ResponseMessage, ResultAppointments, ResultDoctors, ResultPatients } from "../../types/ResponseMessage";
import { submitDoctors } from "../../helpers/submitDoctors";
import { submitAppointments } from "../../helpers/submitAppointments";

export const DataUploader: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState<ResponseMessage | undefined>();
  const [resultDoctors, setResultDoctors] = useState<ResultDoctors>({});
  const [resultAppointments, setResultAppointments] = useState<ResultAppointments>({});
  const [resultPatients, setResultPatients] = useState<ResultPatients>({});

  

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
    try {
      if (dataObj.Patients && dataObj.Patients.length > 0) {
        const resultPatientsData = await submitPatients(dataObj.Patients).then((res) => res);
        console.log(resultPatientsData)
        setResultPatients(resultPatientsData as ResultPatients);
      }

      if (dataObj.Doctors && dataObj.Doctors.length > 0) {
        const resultDoctorsData = await submitDoctors(dataObj.Doctors).then((res) => res);
        console.log(resultDoctorsData)
        setResultDoctors(resultDoctorsData as ResultDoctors);
      }

      if (dataObj.Appointments && dataObj.Appointments.length > 0) {
        const resultAppointmentsData = await submitAppointments(dataObj.Appointments).then((res) => res);
        console.log(resultAppointmentsData)
        setResultAppointments(resultAppointmentsData as ResultAppointments);
      }
      setResponseMessage({ resultPatients, resultDoctors, resultAppointments });
      setShowPopup(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const clearData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    instanceApi.clearData();
  }

  return (
    <form className="DataUploader" onSubmit={onSubmit}>
      <div className="DataUploader__areas">
        <DataArea text="Patients" content="101, 10-12, James Davis, 31.12.1999
102, 11-13, Mary
103, 8-12
"/>
        <DataArea text="Doctors" content="201, 10-13
202, 10-15, Robert
203, 16-18, 01.01.1980


" />
        <DataArea text="Appointments" content="101, 201, 10
101, 202, 14
102, 201, 11
102, 202, 11
"/>
      </div>
      <div className="DataUploader__buttons">
        <Button type="submit" text="Send Data" />
        <Button
          type="button"
          text="Clear DB"
          onClick={clearData}
        />
      </div>
      { showPopup && <Popup closePopup={closePopup} responseMessage={responseMessage} />}
    </form>
  )
}
