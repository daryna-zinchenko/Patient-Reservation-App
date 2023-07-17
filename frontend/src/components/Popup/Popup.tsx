import React from "react";
import { Button } from "../Button";
import "./Popup.scss";
import { ResponseMessage } from "../../types/ResponseMessage";

interface PopupProps {
  closePopup: (e: React.MouseEvent<HTMLButtonElement>) => void;
  responseMessage: ResponseMessage;
}

export const Popup: React.FC<PopupProps> = ({ closePopup, responseMessage }) => {
  console.log(responseMessage)
  return (
    <div className="Popup">
      <div className="Popup__content">
        <div className="Popup__button">
          <Button type="button" text="Close" onClick={closePopup} />
        </div>
        {Object.keys(responseMessage).map((msg) => (
          <div key={msg}>
            <h3>{msg}</h3>
            <p>{JSON.stringify(responseMessage[msg])}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

{/* <h3>Successful Patients</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>Successful Doctors</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>Successful Appointments</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>WrongFormat Patients</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>WrongFormat Doctors</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>WrongFormat Appointments</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>Duplicates Patients</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p>
        <h3>Duplicates Doctors</h3>
        <p>{responseMessage.resultPatients.successfulPatients}</p> */}