import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./customCalendar.scss";
import CalendarToolbar from "./CalendarToolbar";

const localizer = momentLocalizer(moment);

const CustomCalendar = ({ dateRange }) => {

    return (
        <div className="customCalendar">
        <Calendar
            localizer={localizer}
            events={dateRange}
            startAccessor="start"
            endAccessor="end"
            style={{ minHeight: "300px" }}
            defaultView="month"
            defaultDate={dateRange.start}
            views={['month']}
            components={{toolbar: CalendarToolbar}}
        />
        </div>
    )
}

export default CustomCalendar