export function saveEvent(date, event) {
    const events = JSON.parse(localStorage.getItem('events') || '{}');
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

export function getEvents() {
    const events = JSON.parse(localStorage.getItem('events') || '{}');
    Object.keys(events).forEach((date) => {
        if (!Array.isArray(events[date])) {
            events[date] = [events[date]];
        }
    });
    return events;
}

export function removeEvent(date, index) {
    const events = JSON.parse(localStorage.getItem('events') || '{}');
    if (events[date]) {
        events[date].splice(index, 1);
        if (events[date].length === 0) {
            delete events[date];
        }
        localStorage.setItem('events', JSON.stringify(events));
    }
}
