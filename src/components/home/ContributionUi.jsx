"use client";

import React, { useState } from "react";

function getMonthLabels(weeks) {
  const labels = [];
  weeks.forEach((week, index) => {
    const firstDay = week.contributionDays[0];
    const month = new Date(firstDay.date).toLocaleString("default", {
      month: "short",
    });
    const prevMonth = labels.length ? labels[labels.length - 1].month : null;
    if (month !== prevMonth) {
      labels.push({ month, index });
    }
  });
  return labels;
}

function formatDateLabel(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  return `${month} ${day}${suffix}`;
}

export default function ContributionGraph({ contributionCalendar }) {
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  if (!contributionCalendar) return <p>Loading…</p>;

  const weeks = contributionCalendar.weeks;
  const monthLabels = getMonthLabels(weeks);

  const boxSize = 12;
  const boxGap = 2;
  const labelGap = 20;

  function showTooltip(e, day) {
    const rect = e.target.getBoundingClientRect();
    setTooltip(
      `${day.contributionCount} contribution${
        day.contributionCount !== 1 ? "s" : ""
      } on ${formatDateLabel(day.date)}`
    );
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 30 });
  }

  function hideTooltip() {
    setTooltip(null);
  }

  return (
    <div
      className="relative overflow-auto  w-full p-4 border rounded-md"
      style={{ maxWidth: 800 }}
    >
      <p className="text-sm text-gray-800 mb-2 font-semibold">
        {contributionCalendar.totalContributions} contributions in the last year
      </p>

      <svg
        width={weeks.length * (boxSize + boxGap)}
        height={7 * (boxSize + boxGap) + labelGap + 20}
      >
        {monthLabels.map(({ month, index }) => (
          <text
            key={month}
            x={index * (boxSize + boxGap)}
            y={10}
            fontSize="10"
            fill="#767676"
          >
            {month}
          </text>
        ))}

        {["Mon", "Wed", "Fri"].map((label, i) => (
          <text
            key={label}
            x={-20}
            y={(i * 2 + 1) * (boxSize + boxGap) + labelGap}
            fontSize="10"
            fill="#767676"
          >
            {label}
          </text>
        ))}

        {weeks.map((week, colIndex) =>
          week.contributionDays.map((day, rowIndex) => (
            <rect
              key={day.date}
              x={colIndex * (boxSize + boxGap)}
              y={rowIndex * (boxSize + boxGap) + labelGap}
              width={boxSize}
              height={boxSize}
              fill={day.color || "#ebedf0"}
              rx={2}
              ry={2}
              onMouseEnter={(e) => showTooltip(e, day)}
              onMouseLeave={hideTooltip}
              style={{ cursor: "pointer" }}
            />
          ))
        )}
      </svg>

      {tooltip && (
        <div
          className=" cursor-pointer"
          style={{
            position: "fixed",
            top: tooltipPos.y,
            left: tooltipPos.x,
            transform: "translate(-50%, -100%)",
            backgroundColor: "#333",
            color: "#fff",
            padding: "6px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {tooltip}
        </div>
      )}

      <div className="flex items-center gap-1 mt-3 text-xs text-gray-600 select-none">
        {["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"].map(
          (color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
          )
        )}
      </div>
    </div>
  );
}
