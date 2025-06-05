import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Schedule from "./Schedule";
import SearchOptions from "./SearchOptions";
import StudentSchedule from "./pages/StudentSchedule";
import TeacherSchedule from "./pages/TeacherSchedule";
import SelectiveCourses from "./pages/SelectiveCourses";
import PhDClasses from "./pages/PhDClasses";
import StudentExams from "./pages/StudentExams";
import TeacherExams from "./pages/TeacherExams";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/search" element={<SearchOptions />} />
        <Route path="/student-schedule" element={<StudentSchedule />} />
        <Route path="/teacher-schedule" element={<TeacherSchedule />} />
        <Route path="/selective-courses" element={<SelectiveCourses />} />
        <Route path="/phd-schedule" element={<PhDClasses />} />
        <Route path="/student-exams" element={<StudentExams />} />
        <Route path="/teacher-exams" element={<TeacherExams />} />
      </Routes>
    </Router>
  );
}

export default App;
