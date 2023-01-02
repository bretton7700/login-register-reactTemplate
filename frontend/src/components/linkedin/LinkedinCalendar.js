import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const localizer = momentLocalizer(moment);

const LinkedinCalendar = () => {
  const [events, setEvents] = useState([]); // list of scheduled posts
  const [description, setDescription] = useState(''); // content of new post
  const [postDate, setPostDate] = useState(null); // date and time for new post

  const handleSubmit = () => {
    // send request to create new post and save it to the database
    // then update the events list and reset the form
  };

  return (
    <>
      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Schedule Post</Card.Header>
        <Card.Body>
          <Form >
            <Row>


              <Col sm={6}>

                <Form.Group className="mb-3">
                  <Form.Label>Text</Form.Label>
                  <Form.Control type="text" placeholder="Enter Your Description" name="rootPassword" value={description} required onChange={(e) => { setDescription(e.target.value); }} />
                  <Form.Control.Feedback type="invalid">Text  required</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className='mb-3'>
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    selected={postDate}
                    onChange={date => setPostDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
                </Form.Group>

              </Col>
            </Row>


            <Button variant="primary" size="sm" type="submit" id='share' onClick={handleSubmit} >Schedule Post</Button>{" "}
          </Form>



        </Card.Body>
      </Card>

      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Schedule Post</Card.Header>
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
