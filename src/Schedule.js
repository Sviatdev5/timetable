import React, { useState,useMemo } from "react";
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
  const [searchType, setSearchType] = useState("title");
  const isNumeratorWeek = week === "Цей тиждень";

  // Фільтрація у useMemo, щоб не виконувати її щоразу при рендері без змін залежностей
  const filteredSchedule = useMemo(() => {
    if (!searchTerm.trim()) {
      // Якщо запит пустий — показуємо весь розклад
      return weeklySchedule;
    }

    const query = searchTerm.toLowerCase();

    const result = {};

    for (const [day, lessons] of Object.entries(weeklySchedule)) {
      const filteredLessons = lessons.filter(lesson =>
        lesson.subjects.some(subj => {
          if (!subj.title) return false;

          const title = subj.title.toLowerCase();
          const teacher = (subj.teacher || "").toLowerCase();

          if (searchType === "title") return title.includes(query);
          if (searchType === "teacher") return teacher.includes(query);
          // для "both" або будь-якого іншого варіанту
          return title.includes(query) || teacher.includes(query);
        })
      );

      if (filteredLessons.length > 0) {
        result[day] = filteredLessons;
      }
    }

    return result;
  }, [searchTerm, searchType]);

  // Для рендеру уроків - беремо вже фільтрований розклад для вибраного дня
  const lessonsForSelectedDay = filteredSchedule[selectedDay] || [];

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

  const renderSubject = (subj, index, pairIndex) => {
    const isEditing = editingIndex === `${pairIndex}-${index}`;

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
          <div className="search-container">
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
              <option value="title">Предмет</option>
              <option value="teacher">Викладач</option>
              <option value="both">Предмет або викладач</option>
            </select>
            <input
              type="text"
              placeholder="🔍 Введіть запит..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        {/* Кнопки по днях будуть завжди відображені */}
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

      {/* Відображаємо фільтровані уроки вибраного дня */}
      {lessonsForSelectedDay.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>Пар немає</p>
      ) : (
        lessonsForSelectedDay.map((lesson, pairIndex) => (
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





