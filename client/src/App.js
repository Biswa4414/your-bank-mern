import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import FlexSaverPage from "./pages/Dashboard/FlexSaverTable";
import OffsetSaverPage from "./pages/Dashboard/OffsetSaverTable";
import FixedSaverPage from "./pages/Dashboard/FixedSaverTable";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/" element={<FixedSaverPage />} />
        <Route path="/flexSaver" element={<FlexSaverPage />} />
        <Route path="/offsetSaver" element={<OffsetSaverPage />} />
      </Routes>
    </Router>
  );
};

export default App;
