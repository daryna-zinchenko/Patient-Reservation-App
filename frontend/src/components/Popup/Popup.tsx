import React from "react";
import { Button } from "../Button";
import "./Popup.scss";
import { ResponseMessage } from "../../types/ResponseMessage";

interface PopupProps {
  closePopup: (e: React.MouseEvent<HTMLButtonElement>) => void;
  responseMessage?: ResponseMessage;
}

export const Popup: React.FC<PopupProps> = ({ closePopup, responseMessage }) => {

  return (
    <div className="Popup">
      <div className="Popup__content">
        <div className="Popup__button">
          <Button type="button" text="Close" onClick={closePopup} />
        </div>
        {responseMessage?.resultPatients?.successfulPatients && (
          <div>
            <h3>Successful Patients</h3>
            {(responseMessage.resultPatients.successfulPatients).split('\n').map((patient) => {
              return (
                <p key={patient}>{patient}</p>
              );
            })}
          </div>
        )}
        {(responseMessage?.resultDoctors?.successfulDoctors) && (
          <div>
            <h3>Successful Doctors</h3>
            {(responseMessage.resultDoctors.successfulDoctors).split('\n').map((doctor) => {
              return (
                <p key={doctor}>{doctor}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultAppointments?.successfulAppointments && (
          <div>
            <h3>Successful Appointments</h3>
            {(responseMessage.resultAppointments.successfulAppointments).split('\n').map((appointment) => {
              return (
                <p key={appointment}>{appointment}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultPatients?.wrongFormatPatients && (
          <div>
            <h3>WrongFormat Patients</h3>
            {(responseMessage.resultPatients.wrongFormatPatients).split('\n').map((patient) => {
              return (
                <p key={patient}>{patient}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultDoctors?.wrongFormatDoctors && (
          <div>
            <h3>WrongFormat Doctors</h3>
            {(responseMessage.resultDoctors.wrongFormatDoctors).split('\n').map((doctor) => {
              return (
                <p key={doctor}>{doctor}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultAppointments?.wrongFormatAppointments && (
          <div>
            <h3>WrongFormat Appointments</h3>
            {(responseMessage.resultAppointments.wrongFormatAppointments).split('\n').map((appointment) => {
              return (
                <p key={appointment}>{appointment}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultPatients?.duplicatesPatients && (
          <div>
            <h3>Duplicates Patients</h3>
            {(responseMessage.resultPatients.duplicatesPatients).split('\n').map((patient) => {
              return (
                <p key={patient}>{patient}</p>
              );
            })}
          </div>
        )}
        {responseMessage?.resultDoctors?.duplicatesDoctors && (
          <div>
            <h3>Duplicates Doctors</h3>
            {(responseMessage.resultDoctors.duplicatesDoctors).split('\n').map((doctor) => {
              return (
                <p key={doctor}>{doctor}</p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};