import React, { useState, useEffect } from 'react';
import { format, isSameMonth, isSameDay } from 'date-fns';
import { buildCalendar, addMonth, subtractMonth } from '../utils/utils';
import { getEvents, saveEvent, removeEvent } from "../utils/events";
import './calendar.css';

const Calendar = ({ calendar }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate] = useState(new Date());
    const [events, setEvents] = useState({});

    useEffect(() => {
        setEvents(getEvents());
    }, []);

    const onDateClick = (day) => {
        const eventTitle = prompt('Enter event title:');
        if (eventTitle) {
            const startTime = prompt('Enter event start time (HH:mm):');
            const endTime = prompt('Enter event end time (HH:mm):');
            const dayISOString = day.toISOString();
            saveEvent(dayISOString, { title: eventTitle, startTime, endTime });
            const newEvents = {
                ...events,
            };
            if (!newEvents[dayISOString]) {
                newEvents[dayISOString] = [];
            }
            newEvents[dayISOString].push({ title: eventTitle, startTime, endTime });
            setEvents(newEvents);
        }
    };

    const onRemoveEvent = (day, index) => {
        const dayISOString = day.toISOString();
        removeEvent(dayISOString, index);
        const newEvents = {
            ...events,
        };
        newEvents[dayISOString].splice(index, 1);
        if (newEvents[dayISOString].length === 0) {
            delete newEvents[dayISOString];
        }
        setEvents(newEvents);
    };

    const nextMonth = () => {
        setCurrentDate(addMonth(currentDate));
    };

    const prevMonth = () => {
        setCurrentDate(subtractMonth(currentDate));
    };

    const monthLabel = format(currentDate, 'MMMM yyyy');
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const calendarRows = buildCalendar(currentDate);

    return (
        <div className="calendar-header">
            <h1>{calendar.name}</h1>
            <div>
                <button onClick={prevMonth}>Prev</button>
                <span>{monthLabel}</span>
                <button onClick={nextMonth}>Next</button>
            </div>
            <table className="calendar-table">
                <thead>
                <tr>
                    {daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {calendarRows.map((week, index) => (
                    <tr key={index}>
                        {week.map((day) => (
                            <td
                                key={day.number}
                                onClick={() => onDateClick(day.date)}
                                className={isSameDay(day.date, selectedDate) ? 'selected' : isSameMonth(day.date, currentDate) ? '' : 'disabled'}
                            >
                                {day.number}
                                {events[day.date.toISOString()] &&
                                    events[day.date.toISOString()].map((event, index) => (
                                        <div key={index}>
                                            {event.startTime} - {event.endTime} | {event.title}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onRemoveEvent(day.date, index);
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
