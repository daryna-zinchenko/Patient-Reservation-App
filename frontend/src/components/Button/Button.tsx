import React from "react";
import "./Button.scss";

type ButtonProps = {
  type: "button" | "submit";
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({ type, text, onClick}) => {
  return (
    <button className="Button" type={type} onClick={onClick}>
      {text}
    </button>
  )
}