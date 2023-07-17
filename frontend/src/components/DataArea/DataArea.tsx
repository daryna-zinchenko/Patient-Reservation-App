import React from "react";

type DataAreasProps = {
  text: string;
  content?: string;
}

export const DataArea: React.FC<DataAreasProps> = ({ text, content }) => {
  return (
    <label className="DataUploader__areas-label">
      {text}
      <textarea name={text} className="DataUploader__areas-field" defaultValue={content} />
    </label>
  )
}