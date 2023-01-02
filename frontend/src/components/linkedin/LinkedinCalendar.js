import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {  Card } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);

const LinkedinCalendar = () => {
  const [events, setEvents] = useState([]); // list of scheduled posts


 

  return (
    <>
     

      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Calendar</Card.Header>
        <Card.Body>

          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
          />

        </Card.Body>
      </Card>





    </>

  );
};

export default LinkedinCalendar;
