import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchOptions.css";

const options = [
  { label: "Розклад занять для студентів", path: "/student-schedule" },
  { label: "Розклад занять для викладачів зі студентами", path: "/teacher-schedule" },
  { label: "Розклад занять вибіркових дисциплін", path: "/selective-courses" },
  { label: "Розклад занять для аспірантів", path: "/phd-schedule" },
  { label: "Розклад екзаменів для студентів та аспірантів", path: "/student-exams" },
  { label: "Розклад екзаменів для викладачів", path: "/teacher-exams" },
];

const SearchOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="search-options-container">
      <h2>🔍 Оберіть тип розкладу</h2>
      <div className="search-cards">
        {options.map((opt, index) => (
          <div key={index} className="search-card" onClick={() => navigate(opt.path)}>
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchOptions;
