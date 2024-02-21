// FlexSaverPage.js
import React from "react";
import "../Dashboard/dashboard.css";
import { Link,Outlet } from "react-router-dom";

const FlexSaverPage = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Savings Accounts</h2>
      <table className="dashboard-table">
        <tr className="flex">
          <td>Flex Saver</td>
          <td>1.5%</td>
          <td>$0</td>
          <td>Tracker</td>
        </tr>
      </table>
      <div className="dashboard-link">
        <Link to="/dashboard">Fixed Saver</Link>
        <Link to="/offsetSaver">Offset Saver</Link>
        <Outlet />
      </div>
    </div>
  );
};

export default FlexSaverPage;
