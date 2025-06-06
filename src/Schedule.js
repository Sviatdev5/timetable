import React, { useState } from "react";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";

const weeklySchedule = {
  Понеділок: [
    {
      pair: "2 пара",
      time: "10:05 - 11:25",
      subjects: [
        {
          title: "Системний аналіз",
          teacher: "Ковівчак Я.В.",
          type: "Лекція",
          room: "807 V н.к.",
          subgroup: 1,
          numerator: true,
          denominator: true,
        },
      ],
    },
    {
      pair: "3 пара",
      time: "11:40 - 13:00",
      subjects: [
        {
          title: "Комп'ютерні мережі",
          teacher: "Обельовська К.М.",
          type: "Лекція",
          room: "807 V н.к.",
          subgroup: 1,
          numerator: true,
        },
      ],
    },
    {
      pair: "4 пара",
      time: "14:50 - 16:10",
      subjects: [
        {
          title: "Дослідження операцій",
          teacher: "Ріпак Н.С.",
          type: "Лабораторна",
          room: "803 V н.к.",
          subgroup: 1,
          denominator: true,
        },
        {},
      ],
    },
  ],
  Вівторок: [
    {
      pair: "3 пара",
      time: "11:40 - 13:00",
      subjects: [
        {},
        {
          title: "Дослідження операцій",
          teacher: "Рудавський Д.В.",
          type: "Лабораторна",
          room: "804B V н.к.",
          numerator: true,
          subgroup: 2,
        },
      ],
    },
    {
      pair: "4 пара",
      time: "13:15 - 14:35",
      subjects: [
        {
          title: "Командна робота ІТ-галузі та презентаційні навички",
          teacher: "Батюк А.Є.",
          type: "Лекція",
          room: "807 V н.к.",
          numerator: true,
          subgroup: 1,
        },
      ],
    },
    {
      pair: "5 пара",
      time: "14:50 - 16:10",
      subjects: [
        {
          title: "Командна робота ІТ-галузі та презентаційні навички",
          teacher: "Мельник Р.В.",
          type: "Лабораторна",
          room: "107А V н.к.",
          subgroup: 1,
        },
        {
          title: "Командна робота ІТ-галузі та презентаційні навички",
          teacher: "Химиця Н.О.",
          type: "Лабораторна",
          room: "511 V н.к.",
          subgroup: 2,
        },
      ],
    },
  ],
  Середа: [
    {
      pair: "1 пара",
      time: "08:30 - 09:50",
      subjects: [
        {
          title: "Комп'ютерні мережі",
          teacher: "Антонів В.Я.",
          type: "Лабораторна",
          room: "803 V н.к.",
          subgroup: 1,
        },
        {
          title: "Вебтехнології та розробка вебзастосувань",
          teacher: "Арбузов М.В.",
          type: "Лабораторна",
          room: "804Г V н.к.",
          subgroup: 2,
        },
      ],
    },
    {
      pair: "2 пара",
      time: "10:05 - 11:25",
      subjects: [
        {
          title: "Вебтехнології та розробка вебзастосувань",
          teacher: "Троєн О.А.",
          type: "Лабораторна",
          room: "804Г V н.к.",
          subgroup: 1,
        },
        {
          title: "Комп'ютерні мережі",
          teacher: "Антонів В.Я.",
          type: "Лабораторна",
          room: "803 V н.к.",
          subgroup: 2,
        },
      ],
    },
    {
      pair: "3 пара",
      time: "11:40 - 13:00",
      subjects: [
        {
          title: "Системний аналіз",
          teacher: "Дубук В.І.",
          type: "Практична",
          room: "311 V н.к.",
          subgroup: 1,
        },
      ],
    },
  ],
  Четвер: [
  {
    pair: "1 пара",
    time: "08:30 - 09:50",
    subjects: [
      {
        title: "Вебтехнології та розробка вебзастосувань",
        teacher: "Казарян А.Г.",
        type: "Лекція",
        room: "807 V н.к.",
      },
    ],
  },
  {
    pair: "2 пара",
    time: "10:05 - 11:25",
    subjects: [
      {
        title: "Дослідження операцій",
        teacher: "Казимира І.Я.",
        type: "Лекція",
        room: "807 V н.к.",
      },
    ],
  },
],

  Пʼятниця: [],
};


const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Понеділок");
  const [searchTerm, setSearchTerm] = useState("");
  const [week, setWeek] = useState("Цей тиждень");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValues, setEditValues] = useState({});
  const navigate = useNavigate();

  const isNumeratorWeek = week === "Цей тиждень";

  const startEditing = (pairIndex, subjectIndex, subject) => {
    setEditingIndex(`${pairIndex}-${subjectIndex}`);
    setEditValues(subject);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditValues({});
  };

  const saveEditing = (pairIndex, subjectIndex) => {
    weeklySchedule[selectedDay][pairIndex].subjects[subjectIndex] = editValues;
    setEditingIndex(null);
    setEditValues({});
  };

  const filteredLessons = weeklySchedule[selectedDay].filter((lesson) =>
    lesson.subjects.some(
      (subj) => subj.title && subj.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderSubject = (subj, index, pairIndex) => {
    const isEditing = editingIndex === `${pairIndex}-${index}`;

    // Перевірка: чи ця пара показується на цьому тижні
    const shouldShow =
      (isNumeratorWeek && subj.numerator !== false) ||
      (!isNumeratorWeek && subj.denominator !== false);

    if (!subj.title || !shouldShow) {
      return (
        <div key={index} className="subject-card empty-card">
          <div className="subject-title">Пари немає</div>
        </div>
      );
    }

    return (
      <div key={index} className="subject-card">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editValues.title}
              onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
            />
            <input
              type="text"
              value={editValues.teacher}
              onChange={(e) => setEditValues({ ...editValues, teacher: e.target.value })}
            />
            <input
              type="text"
              value={editValues.type}
              onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
            />
            <input
              type="text"
              value={editValues.room}
              onChange={(e) => setEditValues({ ...editValues, room: e.target.value })}
            />
            <div className="edit-buttons">
              <button onClick={() => saveEditing(pairIndex, index)}>💾</button>
              <button onClick={cancelEditing}>❌</button>
            </div>
          </>
        ) : (
          <>
            <div className="subject-title">
              {subj.title}
              <button onClick={() => startEditing(pairIndex, index, subj)} className="edit-btn">
                ✏️
              </button>
            </div>
            <div className="subject-info">{subj.teacher}</div>
            <div className="subject-info">{subj.type}</div>
            <div className="subject-room">{subj.room}</div>
            {subj.online && (
              <a href="#" className="online-link">
                URL онлайн заняття
              </a>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="schedule-container">
      <header className="app-header">
        <h1>📅 Мій розклад</h1>
        <div className="header-controls">
          <button className="search" onClick={() => navigate("/search")}>🔍 Пошук пар</button>
          <button
            className="week-toggle"
            onClick={() =>
              setWeek(week === "Цей тиждень" ? "Наступний тиждень" : "Цей тиждень")
            }
          >
            {week}
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
        weeklySchedule[selectedDay].map((lesson, pairIndex) => (
          <div key={pairIndex} className="lesson-block">
            <div className="lesson-header">
              <span>{lesson.pair}</span>
              <span>{lesson.time}</span>
            </div>
            <div className="subjects">
              {lesson.subjects.map((subj, subjIndex) =>
                renderSubject(subj, subjIndex, pairIndex)
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Schedule;




