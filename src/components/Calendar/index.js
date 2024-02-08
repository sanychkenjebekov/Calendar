import React, {useState} from 'react';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const renderDays = () => {
        const startDayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDayMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const days = [];

        let dayIndex = 0;

        for (let i = 0; i < 6; i++) {
            const row = [];

            for (let j = 0; j < 7; j++) {
                const currentDate = new Date(startDayMonth);
                currentDate.setDate(dayIndex + 1 - startDayMonth.getDay());

                const isToday = currentDate.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && currentDate.toDateString() === selectedDate.toDateString();

                row.push(
                    <td
                        key={dayIndex}
                        className={`calendarDay ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleDateClick(currentDate)}
                    >
                        {dayIndex + 1 - startDayMonth.getDay() > 0 && dayIndex + 1 - startDayMonth.getDay() <= lastDayMonth.getDate() ? dayIndex + 1 - startDayMonth.getDay() : ''}
                    </td>
                );

                dayIndex++;
            }

            days.push(<tr key={i}>{row}</tr>);
        }

        return days;
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    return (
        <div id="calendar">
            <div className="container">
                <div className="calendar">
                    <div className="calendar--header">
                        <button onClick={goToPreviousMonth}>&lt;</button>
                        <h2>{currentMonth.toLocaleString('default', {month: 'long', year: 'numeric'})}</h2>
                        <button onClick={goToNextMonth}>&gt;</button>
                    </div>
                    <table className="calendar--table">
                        <thead>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderDays()}
                        </tbody>
                    </table>
                    {selectedDate ?
                        (
                            <div className="selected--date__info">
                                <p>Выбрали:</p>
                                <p>{selectedDate.toDateString()}</p>
                            </div>)
                        : null}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
