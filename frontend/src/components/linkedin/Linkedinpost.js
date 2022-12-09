import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import '../sidebar.css';




const Linkedinpost = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("code")

    alert(searchParams.get("code"))
    
    const [showing, setShowing] = useState(false);
    const handleShowing = () => setShowing(true);
    const handleClosing = () => setShowing(false);


    const [databaseName, setdatabaseName] = useState('')
    const [rootPassword, setrootPassword] = useState('')
    const [databaseList, setdatabaseList] = useState([])
    const Admin_Email = global.mail;

    useEffect(() => {
        window.scrollTo(0,0);
        
    }, [])

    
    

    return (
        <>
            <div>
                <Modal show={showing} >
                    <Modal.Body>

                        <div className="accordion-item" id="accordionFlushExample">

                            <div className="accordion-body">
                                <Card.Title> You have successfully Created a Mysql Database</Card.Title>

                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            </div>

            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
                <Card.Header>Database Creation</Card.Header>
                <Card.Body>
                    <Form>

                        <Row>
                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Database  Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the name of the database " name="databasename" value={databaseName} required onChange={(e) => { setdatabaseName(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">database name  is  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Root Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the root password of your database" name="rootPassword" value={rootPassword} required onChange={(e) => { setrootPassword(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">root password  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" size="sm" type="submit" id='yenu' >Create Database</Button>{" "}
                    </Form>



                </Card.Body>
            </Card>

        </>
    );
};

export default Linkedinpost;
