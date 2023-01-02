import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const LinkedinCalendar = () => {
  const [events, setEvents] = useState([]); // list of scheduled posts
  const [postText, setPostText] = useState(''); // content of new post
  const [postDate, setPostDate] = useState(null); // date and time for new post

  const handleSubmit = () => {
    // send request to create new post and save it to the database
    // then update the events list and reset the form
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={postText} onChange={e => setPostText(e.target.value)} />
        <DatePicker
          selected={postDate}
          onChange={date => setPostDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="time"
        />
        <button type="submit">Schedule post</button>
      </form>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default LinkedinCalendar;
