import { Routes, Route, Navigate } from "react-router-dom";
import { Students, Teachers } from "../../modules"; // Import from modules
const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-management" />} />
      <Route path="/student-management" element={<Students />} />
      <Route path="/teacher-management" element={<Teachers />} />
    </Routes>
  );
};

export default MainRouter;
