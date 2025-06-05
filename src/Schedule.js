import React, { useState } from "react";
import "./Schedule.css"; 
import { useNavigate } from "react-router-dom";

const weeklySchedule = {
  Понеділок: [
    {
      pair: "3 пара",
      time: "11:40 - 13:00",
      subjects: [
        {
          title: "Дослідження операцій",
          teacher: "Рудавський Д.В.",
          type: "Лабораторна",
          room: "8046 V н.к.",
        },
      ],
    },
    {
      pair: "4 пара",
      time: "13:15 - 14:35",
      subjects: [
        {
          title: "Командна робота IT-галузі та презентаційні навички",
          teacher: "Батюк А.Є.",
          type: "Лекція",
          room: "807 V н.к.",
        },
        {
          title: "Системний аналіз",
          teacher: "Зербіно Д.Д.",
          type: "Лабораторна",
          room: "802а V н.к.",
        },
        {
          title: "Системний аналіз",
          teacher: "Дубук В.І.",
          type: "Лабораторна",
          room: "803 V н.к.",
        },
      ],
    },
    {
      pair: "5 пара",
      time: "14:50 - 16:10",
      subjects: [
        {
          title: "Командна робота IT-галузі та презентаційні навички",
          teacher: "Мельник Р.В.",
          type: "Лабораторна",
          room: "107а V н.к.",
          online: true,
        },
        {
          title: "Командна робота IT-галузі та презентаційні навички",
          teacher: "Химица Н.О.",
          type: "Лабораторна",
          room: "511 V н.к.",
        },
      ],
    },
  ],
  Вівторок: [],
  Середа: [],
  Четвер: [],
  Пʼятниця: [],
};

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Понеділок");
  const [searchTerm, setSearchTerm] = useState("");
  const [week, setWeek] = useState("Цей тиждень");
  const navigate = useNavigate();

  const filteredLessons = weeklySchedule[selectedDay].filter((lesson) =>
    lesson.subjects.some((subj) =>
      subj.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="schedule-container">
      <header className="app-header">
        <h1>📅 Мій розклад</h1>
        <div className="header-controls">
           <button className="search" onClick={() => navigate("/search")}>🔍 Пошук пар</button>

          <button className="week-toggle" onClick={() => {
            setWeek(week === "Цей тиждень" ? "Наступний тиждень" : "Цей тиждень");
          }}>
            {week}
          </button>

          <button className="login-button" onClick={() => alert("Тут буде вхід 🙂")}>
            🔐 Вхід
          </button>
        </div>
      </header>

      

      <div className="day-switcher">
        {Object.keys(weeklySchedule).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={selectedDay === day ? "active-day" : ""}
          >
            {day}
          </button>
        ))}
      </div>

      {weeklySchedule[selectedDay].length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Пар немає</p>
      ) : (
        weeklySchedule[selectedDay].map((lesson, index) => (
          <div key={index} className="lesson-block">
            <div className="lesson-header">
              <span>{lesson.pair}</span>
              <span>{lesson.time}</span>
            </div>
            <div className="subjects">
              {lesson.subjects.map((subj, i) => (
                <div key={i} className="subject-card">
                  <div className="subject-title">{subj.title}</div>
                  <div className="subject-info">{subj.teacher}</div>
                  <div className="subject-info">{subj.type}</div>
                  <div className="subject-room">{subj.room}</div>
                  {subj.online && (
                    <a href="#" className="online-link">
                      URL онлайн заняття
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;

