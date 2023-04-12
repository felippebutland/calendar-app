import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths } from 'date-fns';

export function buildCalendar(date) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, dateFormat);
            days.push({
                date: day,
                number: formattedDate,
            });
            day = new Date(day.setDate(day.getDate() + 1));
        }
        rows.push(days);
        days = [];
    }

    return rows;
}

export function addMonth(date) {
    return addMonths(date, 1);
}

export function subtractMonth(date) {
    return subMonths(date, 1);
}
