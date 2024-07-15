import React, { useEffect, useRef, useState } from "react";
import AlertDropdown from "../AlertDropdown/AlertDropdown";
import { Col, Row } from "react-bootstrap";
import EMDMH from "./Card/EMDMH";

import appData from "../../../app_data.json";

// nerdGraph
import { NerdGraphQuery } from "nr1";

const ParentCard = () => {
  const [uniqueAlerts, setUniqueAlerts] = useState(undefined);
  const [allAlerts, setAllAlerts] = useState("");
  const [selectedAlert, setSelectedAlert] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      loadAlerts();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  const fetchNerdGraphQuery = async (query) => {
    try {
      const response = await NerdGraphQuery.query({ query });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetch_NerdGraph_Query_Result = async (customQuery, account_id) => {
    try {
      const response = await fetchNerdGraphQuery(`{
      actor {
        account(id:${account_id}) {
          nrql(query: "${customQuery}"
              timeout :200
          ) {
            rawResponse
          }
        }
      }
    }`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const loadAlerts = async () => {
    try {
      const allAlertsResponse = await fetch_NerdGraph_Query_Result(
        appData.allAlerts,
        appData.accountId
      );
      setAllAlerts(
        allAlertsResponse.data.actor.account.nrql.rawResponse.results[0].events
      );

      const uniqueAlertsResponse = await fetch_NerdGraph_Query_Result(
        appData.uniqueAlerts,
        appData.accountId
      );
      setUniqueAlerts(
        uniqueAlertsResponse.data.actor.account.nrql.rawResponse.results[0]
          .members
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ margin: "10px" }}>
        <div>
          <Row>
            <Col md={{ offset: 7 }}>
              <AlertDropdown
                selectedAlert={selectedAlert}
                setSelectedAlert={setSelectedAlert}
                uniqueAlerts={uniqueAlerts}
              />
            </Col>
          </Row>
        </div>

        <div>
          <EMDMH allAlerts={allAlerts} selectedAlert={selectedAlert} />
        </div>
      </div>
    </div>
  );
};

export default ParentCard;
