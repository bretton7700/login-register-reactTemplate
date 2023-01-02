import React, { useEffect,useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {  Card } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLocation, useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const userEmail = localStorage.getItem('userEmail');

const LinkedinCalendar = () => {
  const [events, setEvents] = useState([]); // list of scheduled posts
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const controller = new AbortController();
  
  const getEvents = async (email,controller) => {
    try {
      const response = await axiosPrivate.get(`/posts/${email}`, {
        signal: controller.signal
      });

      // map the event data to the expected format
      const calendarEvents = response.data.map(event => ({
        start: moment(event.scheduledTime).toDate(),
        // set the end date to the start date + 1 hour
        end: moment(event.scheduledTime).add(1, 'hour').toDate(),
        title: event.description
      }));

      // update the events state variable
      setEvents(calendarEvents);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      if (isMounted) {
        await getEvents(userEmail);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userEmail,controller]);

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
