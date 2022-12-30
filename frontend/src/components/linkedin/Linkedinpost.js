
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Dropdown, Modal, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import '../sidebar.css';
import DateTimePicker from 'react-datetime-picker';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const PUBLISH_URL = '/linkedin/publish';
const SCHEDULE_URL = '/linkedin/schedule';

const Linkedinpost = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")
    const [value, onChange] = useState(new Date());
    const axiosPrivate = useAxiosPrivate();

    const [showing, setShowing] = useState(false);

    const handleShowing = () => setShowing(true);
    const handleClosing = () => setShowing(false);

    const [show, setShow] = useState(false);
    
    const handleShow = () => {
        if(description.length === 0){
        alert('please fill in the description')
        }
        else{
            setShow(true)
        }
    }

    const [description, setDescription] = useState('')



    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])

    const handleSchedule = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post(SCHEDULE_URL,
                JSON.stringify({  description: description, }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));

            setDescription('');
            
        } catch (err) {
            if (!err.response) {
                alert('No Server Response');
            } else {
                alert('Scheduling Failed')
            }
            
        }
    }

    const SendPost = async (event) => {

        event.preventDefault();


        if (description.length === 0) {
            alert('please fill in the details');

        } else {
            await axiosPrivate.get("/linkedin/callback",
                {
                    params: {
                        code: code,
                    },
                }).then(async () => {
                    // Wait for the get request to resolve
                    const response = await axiosPrivate.get("/linkedin/userID");
                    // Set the userID variable using the response data


                    // Wait for the post request to resolve
                    await axiosPrivate.post(PUBLISH_URL,
                        JSON.stringify({
                            description: description,

                        }), {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }).then((response) => {
                        alert(response.status)
                    })
                })





        }




    }








    return (
        <>
            <div>
                <Modal show={showing} >
                    <Modal.Body>

                        <div className="accordion-item" id="accordionFlushExample">

                            <div className="accordion-body">
                                <Card.Title>  successfully Sent Post</Card.Title>

                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            </div>

            <div>
                <Modal show={show} >
                    <Modal.Body>

                        <div className="accordion-item" id="accordionFlushExample" >
                            <div  className="accordion-collapse collapse show"  data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <Card.Title>Select A Date and Time</Card.Title>
                                    <Form>
                                        <Form.Group>
                                            <DateTimePicker onChange={onChange} value={value} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Button variant="danger" size="sm" onClick={handleSchedule}>Schedule</Button>{" "}

                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                </Modal>
            </div>

            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
                <Card.Header>Send Post</Card.Header>
                <Card.Body>
                    <Form >


                        <Row>


                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Description" name="rootPassword" value={description} required onChange={(e) => { setDescription(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">description  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                Choose One
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={SendPost}>Share Now</Dropdown.Item>
                                <Dropdown.Item onClick={handleShow}>Schedule Post</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* <Button variant="primary" size="sm" type="submit" id='share' >Share Now</Button>{" "} */}
                    </Form>



                </Card.Body>
            </Card>

        </>
    );
};

export default Linkedinpost;
