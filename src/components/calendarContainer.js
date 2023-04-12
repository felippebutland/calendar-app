import React from 'react';
import Calendar from './calendar';

const mockCalendar = {
    id: '1',
    name: 'My Calendar',
    events: [
        {
            id: 'event-1',
            title: 'Meeting',
            date: '2023-04-12T10:00:00.000Z',
        },
    ],
};

const CalendarContainer = () => {
    return <Calendar calendar={mockCalendar} />;
};

export default CalendarContainer;
