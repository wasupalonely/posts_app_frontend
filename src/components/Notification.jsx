import React from "react";

const Notification = ({ title, content, seen, type }) => {
  return (
    <div className={`p-4 mb-2 border rounded bg-gray-900 text-white`}>
      <div className="flex items-center">
        <div className="mr-4">
          {type === "follow" ? (
            <box-icon type="solid" color="white" name="user-plus"></box-icon>
          ) : type === "like" ? (
            <box-icon type="solid" color="red" name="heart"></box-icon>
          ) : type === "comment" ? (
            <box-icon type="solid" color="green" name="comment"></box-icon>
          ) : type === "message" ? (
            <box-icon type="solid" color="white" name="message"></box-icon>
          ) : null}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{title}</h3>
            {!seen && <span className="w-3 h-3 bg-white rounded-full"></span>}
          </div>
          <p className="text-white">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
