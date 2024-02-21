import React from "react";
import { Link,Outlet } from "react-router-dom";

const OffsetSaverPage = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Savings Accounts</h2>
      <table className="dashboard-table">
        <tr className="flex">
          <td>Offset Saver</td>
          <td>1.8%</td>
          <td>$1000</td>
          <td>Fixed</td>
        </tr>
      </table>
      <div className="dashboard-link">
        <Link to="/flexSaver">Flex Saver</Link>
        <Link to="/dashboard">Fixed Saver</Link>
        <Outlet />
      </div>
    </div>
  );
};

export default OffsetSaverPage;
