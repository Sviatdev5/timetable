import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Star, Trash2 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState(() => {
    return JSON.parse(localStorage.getItem("groups")) || [];
  });
  const [collapsed, setCollapsed] = useState(false);

  const handleAddGroup = () => {
    const trimmed = groupName.trim();
    if (trimmed && !groups.includes(trimmed)) {
      const updated = [...groups, trimmed];
      setGroups(updated);
      setGroupName("");
      localStorage.setItem("groups", JSON.stringify(updated));
    }
  };

  const handleDelete = (name) => {
    const updated = groups.filter((g) => g !== name);
    setGroups(updated);
    localStorage.setItem("groups", JSON.stringify(updated));
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="add-btn" onClick={() => setCollapsed(!collapsed)}>
  {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
</button>

      {!collapsed && (
        <div className="sidebar-content">
          <h2>Збережені</h2>
          <div className="group-input">
            <input
              type="text"
              placeholder="Введіть назву групи"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button className="add-btn" onClick={handleAddGroup}>+</button>
          </div>
          <ul className="group-list">
            {groups.map((group, idx) => (
              <li key={idx} className="group-item">
                <span>{group}</span>
                <div className="group-actions">
                  <Star size={18} strokeWidth={2} />
                  <Trash2
                    size={18}
                    strokeWidth={2}
                    className="delete-icon"
                    onClick={() => handleDelete(group)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;



