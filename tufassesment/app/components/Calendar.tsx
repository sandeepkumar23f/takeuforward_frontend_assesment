'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({
  currentDate,
  onMonthChange,
  startDate,
  endDate,
  onDateSelect,
}: CalendarProps) {
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateInRange = (date: Date) => {
    if (!startDate) return false;
    if (startDate && !endDate) return date.toDateString() === startDate.toDateString();
    if (startDate && endDate) {
      return date >= startDate && date <= endDate;
    }
    return false;
  };

  const isStartDate = (date: Date) => {
    return startDate && date.toDateString() === startDate.toDateString();
  };

  const isEndDate = (date: Date) => {
    return endDate && date.toDateString() === endDate.toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handlePrevMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`weekday-${i}`} className="text-center font-semibold text-gray-600 py-2">
          {weekdays[i]}
        </div>
      );
    }

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const inRange = isDateInRange(date);
      const isStart = isStartDate(date);
      const isEnd = isEndDate(date);
      const today = isToday(date);

      let dateClasses = 'p-2 text-center rounded-lg transition-all cursor-pointer ';
      
      if (isStart || isEnd) {
        dateClasses += 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105 ';
      } else if (inRange) {
        dateClasses += 'bg-blue-100 text-blue-800 ';
      } else if (today) {
        dateClasses += 'border-2 border-amber-500 bg-amber-50 ';
      } else {
        dateClasses += 'hover:bg-gray-100 hover:shadow-md ';
      }

      days.push(
        <div key={day} className={dateClasses} onClick={() => onDateSelect(date)}>
          <div className="font-medium">{day}</div>
          {today && <div className="text-xs opacity-75">Today</div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar-container">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-semibold text-gray-800">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {renderCalendarDays()}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-linear-to-r from-blue-500 to-purple-500 rounded"></div>
          <span>Selected Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded"></div>
          <span>In Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-amber-500 rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}