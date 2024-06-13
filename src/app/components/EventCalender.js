import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const EventCalender = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between py-2">
        <button onClick={prevMonth} className="focus:outline-none">
          <ChevronLeftIcon className="h-6 w-6 text-gray-500" />
        </button>
        <div>
          <span className="text-lg font-bold text-gray-800">
            {format(currentMonth, 'MMMM yyyy', { locale: enUS })}
          </span>
        </div>
        <button onClick={nextMonth} className="focus:outline-none">
          <ChevronRightIcon className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEE';
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="flex items-center justify-center py-2 text-sm font-medium text-gray-800">
          {format(addDays(startDate, i), dateFormat, { locale: enUS })}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            key={day}
            className={`px-4 py-2 border border-gray-200 relative cursor-pointer ${
              !isSameMonth(day, monthStart) ? 'bg-gray-100' : ''
            } ${isSameDay(day, new Date()) ? 'bg-blue-200' : ''}`}
          >
            <span className={`inline-block ${isSameMonth(day, monthStart) ? 'text-gray-900' : 'text-gray-400'}`}>
              {formattedDate}
            </span>
            <div className="absolute inset-0 flex flex-col justify-end pb-1">
              {events
                .filter(event => isSameDay(new Date(event.date), cloneDay))
                .map(event => (
                  <div
                    key={event.id}
                    className="bg-blue-500 text-white rounded-lg px-2 py-1 text-xs truncate"
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="max-w-[1100px] mx-auto mt-4 mb-4">
      <div className="flex">
        <div className="w-1/4 bg-white shadow rounded-lg p-4 mr-4">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Agenda</h2>
          <ul>
            {events.map(event => (
              <li key={event.id} className="mb-2">
                <div className="bg-blue-500 text-white rounded-lg px-2 py-1 text-sm">
                  <span className="font-bold">{format(new Date(event.date), 'dd MMM yyyy')}</span>: {event.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 bg-white shadow rounded-lg p-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default EventCalender;
