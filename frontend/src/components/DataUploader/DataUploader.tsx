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
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({});
  const [resultPatients, seResultPatients] = useState<ResultPatients>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataObj = Object.fromEntries(formData.entries());
   
    seResultPatients(await submitPatients((dataObj.Patients)) as ResultPatients)
    const resultDoctors = await submitDoctors(dataObj.Doctors) as ResultDoctors;
    const resultAppointments = await submitAppointments(dataObj.Appointments) as ResultAppointments;
    setShowPopup(true);
    setResponseMessage({resultPatients, resultDoctors, resultAppointments});
    (e.target as HTMLFormElement).reset();
  }

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
        <DataArea text="Patients" />
        <DataArea text="Doctors" content="101, 10-12, James Davis, 31.12.1999
102, 10-12, James Davis, 31.12.1999

" />
        <DataArea text="Appointments" />
      </div>
      <div className="DataUploader__buttons">
        <Button type="submit" text="Send Data" />
        <Button
          type="button"
          text="Clear DB"
          onClick={clearData}
        />
      </div>
      {showPopup && <Popup closePopup={closePopup} responseMessage={responseMessage} />}
    </form>
  )
}
