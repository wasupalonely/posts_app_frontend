import React from "react";

const StatusMessage = ({ type, message, genericImage }) => {
  const renderContent = () => {
    if (type === "loading") {
      return (
        <div className="flex flex-col items-center justify-center">
          <box-icon
            name="loader-alt"
            color="white"
            animation="spin"
            size="lg"
          ></box-icon>
          <p className="font-semibold mt-3">{message}</p>
        </div>
      );
    } else if (type === "empty") {
      return (
        <div className="flex flex-col items-center justify-center">
          <box-icon
            color="white"
            size="lg"
            name="task-x"
            animation="tada"
          ></box-icon>
          <p className="font-semibold mt-3">{message}</p>
        </div>
      );
    } else if (type === "info") {
      return (
        <div className="flex flex-col items-center justify-center">
          <box-icon type="solid" name={genericImage} color="white" size="lg"></box-icon>
          <p className="font-semibold mt-3">{message}</p>
        </div>
      );
    } else {
      return <p className="font-semibold">{message}</p>;
    }
  };

  return (
    <div
      className={`p-4 flex-col text-white rounded-lg flex items-center justify-center`}
    >
      {renderContent()}
    </div>
  );
};

export default StatusMessage;
