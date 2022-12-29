
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import '../sidebar.css';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";



const Linkedinpost = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")

    const axiosPrivate = useAxiosPrivate();
    
    const [showing, setShowing] = useState(false);
    const handleShowing = () => setShowing(true);
    const handleClosing = () => setShowing(false);


    
    const [description, setDescription] = useState('')
    const [userID, setUserID] = useState('')
    

    useEffect(() => {
        window.scrollTo(0,0);
        
    }, [])

    const SendPost = async (event) => {

        event.preventDefault();


        if ( description.length === 0) {
            alert('please fill in the details');

        } else {
            await axiosPrivate.get("/linkedin/callback",
                {
                    params: {
                        code: code,
                    },
                })
                .then(() => {
                   
                    axiosPrivate.get("/linkedin/userID").then((response) =>{
                        const data  = response.data;
                        // setUserID(data)

                    }).then((response) =>{
                        axiosPrivate.post('/linkedin/publish',
                        {

                           
                            description: description,
                            userID: response.data,


                        })
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

            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
                <Card.Header>Send Post</Card.Header>
                <Card.Body>
                    <Form onSubmit={SendPost}>
                        

                        <Row>
                            

                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Your Description" name="rootPassword" value={description} required onChange={(e) => { setDescription(e.target.value); }} />
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
