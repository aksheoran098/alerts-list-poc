import React, { useState } from "react";

const AlertDropdown = ({ selectedAlert, setSelectedAlert, uniqueAlerts }) => {
  const handleAlertChange = (e) => {
    setSelectedAlert(e.target.value);
  };

  const items = ["item1", "item2"];
  return (
    <div>
      <label htmlFor="alertSelectBox">
        Select Alert: {!uniqueAlerts && " Loading..."}
      </label>
      <select
        id="alertSelectBox"
        value={selectedAlert}
        onChange={handleAlertChange}
      >
        <option value={""} key={"allAlerts"}>
          All alerts
        </option>
        {uniqueAlerts &&
          uniqueAlerts.map((option, index) => (
            <option value={option} key={index}>
              {" "}
              {option}{" "}
            </option>
          ))}
      </select>
    </div>
  );
};

export default AlertDropdown;
