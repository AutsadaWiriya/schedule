"use client";

import React, { useState } from "react";

const scheduleData = [
  {
    subject: "CompEng Prob&Stat",
    code: "261306(801)",
    room: "ENG718",
    time: "13:00 - 14:30",
    day: ["monday", "thursday"],
  },
  {
    subject: "Software Eng",
    code: "261361(801)",
    room: "ENG718",
    time: "14:30 - 16:00",
    day: ["monday", "thursday"],
  },
  {
    subject: "Psychology and Daily Life",
    code: "013110(804)",
    room: "210",
    time: "16:30 - 18:00",
    day: ["monday", "thursday"],
  },
  {
    subject: "OS",
    code: "261305(801)",
    room: "ENG718",
    time: "9:30 - 11:00",
    day: ["tuesday", "friday"],
  },
  {
    subject: "Nets and Info Sec",
    code: "261447(801)",
    room: "ENG211",
    time: "11:00 - 12:30",
    day: ["tuesday", "friday"],
  },
  {
    subject: "Radiation in Everyday Life",
    code: "515101(801)",
    room: "ONLINE",
    time: "13:00 - 16:00",
    day: ["tuesday"],
  },
  {
    subject: "Skills for Prof and Entre",
    code: "259192(801)",
    room: "ONLINE",
    time: "16:30 - 18:00",
    day: ["wednesday"],
  },
];

const groupByDay = () => {
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const scheduleByDay = {};

  daysOfWeek.forEach((day) => {
    scheduleByDay[day] = scheduleData.filter((entry) => entry.day.includes(day));
  });

  return scheduleByDay;
};

const getCurrentDay = () => {
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
  const today = new Date().getDay();
  return daysOfWeek[today];
};

export default function Home() {
  const scheduleByDay = groupByDay();
  const currentDay = getCurrentDay();
  const [expandedDay, setExpandedDay] = useState(null);

  const sortedSchedule = Object.entries(scheduleByDay).sort(([dayA], [dayB]) => {
    if (dayA === currentDay) return -1;
    if (dayB === currentDay) return 1;
    return 0;
  });

  return (
    <div className="flex justify-center p-6 w-[80%] md:w-[40%] mx-auto">
      <div className="w-full">
        <h1 className="text-3xl font-semibold mb-8 text-center text-[#53A3F1]">Class Schedule</h1>
        {sortedSchedule.map(([day, classes]) => (
          <div
            key={day}
            className={`mb-6 rounded-xl ${day === currentDay ? "bg-[#3275b496] text-white" : "bg-[white] text-[#53A3F1]"} shadow-xl transition-all duration-300`}
          >
            <div
              onClick={() => {
                if (day !== currentDay) {
                  setExpandedDay(expandedDay === day ? null : day);
                }
              }}
              className={`cursor-pointer p-6 flex justify-between items-center ${expandedDay === day || day === currentDay ? "rounded-xl" : "rounded-xl"}`}
            >
              <h2 className={`text-xl font-semibold capitalize ${day === currentDay ? "text-[white]" : "text-[#53A3F1]"}`}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </h2>
              <span className="text-gray-400">{expandedDay === day || day === currentDay ? "-" : "+"}</span>
            </div>
            {(expandedDay === day || day === currentDay) && (
              <div className="p-4">
                <div className="flex flex-col gap-6">
                  {classes.map((classItem, index) => (
                    <ClassCard key={index} classItem={classItem} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClassCard({ classItem, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = [
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
    "bg-[#E2F0FF]",
  ];

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`cursor-pointer w-full p-4 ${colors[index % colors.length]} rounded-xl shadow-sm hover:shadow-md transition-all duration-300`}
    >
      <h3 className="text-lg font-semibold text-[#3275B4]">{classItem.subject}</h3>
      <p className="text-[#3275B4]"><strong>Time:</strong> {classItem.time}</p>
      {isExpanded && (
        <div>
          <p className="text-[#3275B4]"><strong>Code:</strong> {classItem.code}</p>
          <p className="text-[#3275B4]"><strong>Room:</strong> {classItem.room}</p>
        </div>
      )}
    </div>
  );
}
