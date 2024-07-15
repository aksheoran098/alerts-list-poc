import React, { useEffect, useRef, useState } from "react";
import OverlayTrigger from "../../../../../node_modules/react-bootstrap/esm/OverlayTrigger";

const EMDMH = ({ allAlerts, selectedAlert }) => {
  // const [color, setColor] = useState("green");
  // const [displayAlerts,setDisplayAlerts] = useState ([])
  const [showTooltip, setShowTooltip] = useState(false);
  let isClicked = useRef(false);
  let [showMore, setShowMore] = useState(false);

  let color = allAlerts ? "green" : "grey";
  const handleClick = () => {
    isClicked.current = !isClicked.current;
    setShowTooltip(isClicked.current);
    if (!isClicked.current && showMore) setShowMore(false);
  };
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  const handleMouseLeave = () => {
    if (!isClicked.current) {
      setShowTooltip(false);
    }
  };
  const dateFormater = (timestamp) => {
    let myDate = new Date(timestamp);
    return myDate.toLocaleString();
  };
  const updateColor = (priority) => {
    if (color != "red") {
      if (priority == "warning") color = "yellow";
      if (priority == "critical") color = "red";
    }
  };
  const printItem = (item, index) => (
    <li key={index} className="listItem">
      <div className="alertTitle">
        <b>{item.title} </b>
      </div>
      <div className="alertDetails">
        <span className={item.priority}>{item.priority}</span>
        <span> {dateFormater(item.timestamp)} </span>
        <span>
          <a href={item.incidentLink} className="incidentLInk" target="_blank">
            Incident Link
          </a>
        </span>
      </div>
    </li>
  );
  const showMoreHandle = () => {
    setShowMore(!showMore);
  };
  const initialView = () => [
    printItem(displayAlerts[0], 0),
    printItem(displayAlerts[1], 1),
    printItem(displayAlerts[2], 2),
    printItem(displayAlerts[3], 3),

    <li className="show-more-button" onClick={showMoreHandle}>
      Show more
    </li>,
  ];
  // updating displayAlert and color both
  const displayAlerts = !allAlerts
    ? []
    : selectedAlert
    ? allAlerts.filter((item) => item.title == selectedAlert)
    : allAlerts;
  displayAlerts.forEach((item) => updateColor(item.priority));

  const renderTooltip = (props) => (
    <div {...props} className="custom-tooltip">
      <ul>
        {!allAlerts ? (
          <li>Loading...</li>
        ) : displayAlerts.length == 0 ? (
          <li>No such alert</li>
        ) : !selectedAlert && !showMore && displayAlerts.length > 4 ? (
          initialView()
        ) : (
          displayAlerts.map((item, index) => printItem(item, index))
        )}
        {allAlerts &&
          !selectedAlert &&
          showMore &&
          displayAlerts.length > 4 && (
            <li onClick={() => setShowMore(false)} className="show-more-button">
              Show less
            </li>
          )}
      </ul>
    </div>
  );

  return (
    <>
      <div className="main-container" style={{ width: "fit-content" }}>
        <div className="hex-container">
          <div className="tooltip-container">
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip}
              show={showTooltip}
            >
              <div
                style={{ backgroundColor: color }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {" "}
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </>
  );
};

export default EMDMH;
