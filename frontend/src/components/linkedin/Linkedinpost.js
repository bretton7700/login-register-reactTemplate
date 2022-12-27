import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import '../sidebar.css';




const Linkedinpost = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")

    alert(searchParams.get("code"))
    
    const [showing, setShowing] = useState(false);
    const handleShowing = () => setShowing(true);
    const handleClosing = () => setShowing(false);


    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [databaseList, setdatabaseList] = useState([])
    const Admin_Email = global.mail;

    useEffect(() => {
        window.scrollTo(0,0);
        
    }, [])

    const SendPost = (event) => {

        event.preventDefault();


        if (title.length === 0 | description.length === 0) {
            alert('please fill in the details');

        } else {
            Axios.get("https://backpub.ndovucloud.com/getAccessToken",
                {
                    params: {
                        code: code,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    alert(data);
                    
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

            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
                <Card.Header>Send Post</Card.Header>
                <Card.Body>
                    <Form onSubmit={SendPost}>
                        

                        <Row>
                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" id="title" placeholder="Title"  value={title} required onChange={(e) => { setTitle(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">title is  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Description" name="rootPassword" value={rootPassword} required onChange={(e) => { setDescription(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">description  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" size="sm" type="submit" id='share' >Share Now</Button>{" "}
                    </Form>



                </Card.Body>
            </Card>

        </>
    );
};

export default Linkedinpost;
