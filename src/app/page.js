"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Clock, MapPin, Hash, Calendar } from "lucide-react";

const scheduleData = [
  {
    subject: "Comp Nets Design & Management",
    code: "261434(801)",
    room: "ENG413A",
    time: "14:30 - 16:00",
    day: ["monday", "thursday"],
  },
  {
    subject: "Full Stack Development",
    code: "261497(803)",
    room: "ENG518",
    time: "9:30 - 11:00",
    day: ["tuesday", "friday"],
  },
  {
    subject: "IT Infra & Cloud Tech",
    code: "261494(803)",
    room: "ENG501",
    time: "14:30 - 16:00",
    day: ["tuesday", "friday"],
  },
  {
    subject: "Adv Comp Eng Tech",
    code: "261405(801)",
    room: "ENG521",
    time: "9:30 - 12:30",
    day: ["wednesday"],
  },
  {
    subject: "Secrets of the soil",
    code: "361100(801)",
    room: "ONLINE",
    time: "14:30 - 17:30",
    day: ["thursday"],
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
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const today = new Date().getDay();
  return daysOfWeek[today];
};

const dayColors = {
  monday: "from-blue-500 to-indigo-600",
  tuesday: "from-emerald-500 to-teal-600",
  wednesday: "from-amber-500 to-orange-600",
  thursday: "from-purple-500 to-violet-600",
  friday: "from-rose-500 to-pink-600",
};

const dayIcons = {
  monday: "🌟",
  tuesday: "🚀",
  wednesday: "⚡",
  thursday: "🎯",
  friday: "🎉",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Class Schedule
            </h1>
          </div>
          <p className="text-slate-600 text-lg">
            Today is <span className="font-semibold text-blue-600 capitalize">{currentDay}</span>
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid gap-4 sm:gap-6">
          {sortedSchedule.map(([day, classes]) => (
            <DayCard
              key={day}
              day={day}
              classes={classes}
              isToday={day === currentDay}
              isExpanded={expandedDay === day}
              onToggle={() => {
                if (day !== currentDay) {
                  setExpandedDay(expandedDay === day ? null : day);
                }
              }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500">
          <p className="text-sm">
            📚 Stay organized, stay successful!
          </p>
        </div>
      </div>
    </div>
  );
}

function DayCard({ day, classes, isToday, isExpanded, onToggle }) {
  const shouldShow = isExpanded || isToday;
  
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl ${
      isToday 
        ? `bg-gradient-to-r ${dayColors[day]} text-white ring-4 ring-blue-200 ring-opacity-50` 
        : "bg-white border border-slate-200 hover:border-blue-300"
    }`}>
      {/* Day Header */}
      <div
        onClick={onToggle}
        className={`p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
          !isToday ? "hover:bg-slate-50" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{dayIcons[day]}</span>
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold capitalize ${
                isToday ? "text-white" : "text-slate-800"
              }`}>
                {day}
              </h2>
              <p className={`text-sm ${
                isToday ? "text-blue-100" : "text-slate-500"
              }`}>
                {classes.length} {classes.length === 1 ? "class" : "classes"}
              </p>
            </div>
          </div>
          
          {!isToday && (
            <div className="flex items-center gap-2">
              {isExpanded ? (
                <ChevronUp className="w-6 h-6 text-slate-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-slate-400" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Classes */}
      {shouldShow && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="grid gap-3 sm:gap-4">
            {classes.map((classItem, index) => (
              <ClassCard 
                key={index} 
                classItem={classItem} 
                index={index}
                isToday={isToday}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ClassCard({ classItem, index, isToday }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardColors = [
    "from-blue-50 to-indigo-50 border-blue-200",
    "from-emerald-50 to-teal-50 border-emerald-200",
    "from-amber-50 to-orange-50 border-amber-200",
    "from-purple-50 to-violet-50 border-purple-200",
    "from-rose-50 to-pink-50 border-rose-200",
  ];

  const textColors = [
    "text-blue-700",
    "text-emerald-700",
    "text-amber-700",
    "text-purple-700",
    "text-rose-700",
  ];

  const colorIndex = index % cardColors.length;

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`cursor-pointer rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
        isToday 
          ? "bg-white/20 backdrop-blur-sm border border-white/30" 
          : `bg-gradient-to-br ${cardColors[colorIndex]} border`
      } p-4 sm:p-5`}
    >
      {/* Class Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className={`font-bold text-base sm:text-lg leading-tight ${
          isToday ? "text-white" : textColors[colorIndex]
        }`}>
          {classItem.subject}
        </h3>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
          isToday 
            ? "bg-white/20 text-white" 
            : "bg-white/70 " + textColors[colorIndex]
        }`}>
          <Clock className="w-3 h-3" />
          {classItem.time}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="space-y-2 pt-3 border-t border-white/20">
          <div className="flex items-center gap-2">
            <Hash className={`w-4 h-4 ${isToday ? "text-white" : textColors[colorIndex]}`} />
            <span className={`text-sm ${isToday ? "text-white/90" : "text-slate-600"}`}>
              <strong>Code:</strong> {classItem.code}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${isToday ? "text-white" : textColors[colorIndex]}`} />
            <span className={`text-sm ${isToday ? "text-white/90" : "text-slate-600"}`}>
              <strong>Room:</strong> 
              <span className={`ml-1 px-2 py-1 rounded-md text-xs font-medium ${
                classItem.room === "ONLINE" 
                  ? (isToday ? "bg-green-500/20 text-green-100" : "bg-green-100 text-green-700")
                  : (isToday ? "bg-white/20 text-white" : "bg-white/70 " + textColors[colorIndex])
              }`}>
                {classItem.room}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Click hint */}
      <div className={`text-xs mt-3 ${isToday ? "text-white/70" : "text-slate-400"}`}>
        Click to {isExpanded ? "collapse" : "expand"} details
      </div>
    </div>
  );
}