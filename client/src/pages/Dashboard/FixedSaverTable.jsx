import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Dashboard/dashboard.css";

const FixedSaverPage = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Savings Accounts</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Interest Rate</th>
            <th>Minimum Deposit</th>
            <th>Interest Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Fixed Saver</td>
            <td>2.20%</td>
            <td>$500</td>
            <td>Fixed</td>
          </tr>
          <tr className="flexSaver">
            <td>Flex Saver</td>
            <td>1.5%</td>
            <td>$0</td>
            <td>Tracker</td>
          </tr>
          <tr className="offsetSaver">
            <td>Offset Saver</td>
            <td>1.8%</td>
            <td>$1000</td>
            <td>Fixed</td>
          </tr>
        </tbody>
      </table>
      <div className="dashboard-link">
        <Link to="/flexSaver">Flex Saver</Link>
        <Link to="/offsetSaver">Offset Saver</Link>
        <Outlet />
      </div>
    </div>
  );
};

export default FixedSaverPage;
