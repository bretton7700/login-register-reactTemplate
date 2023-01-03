import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Free from '../images/Free.jpg';
import '../WorkspaceList.css';
///
const Freeservices = () => {

    return (
        <>


            <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
                <div className="accordion accordion-flush" id="accordionFlushExample" style={{ maxWidth: '600px', width: '600px' }}>
                    <Card.Header>LIST OF FREE SERVICES</Card.Header>
                    <Card.Body>
                        <div className="accordion-item" id="accordionFlushExample">

                            <div className="accordion-body">
                                <div>
                                    <img src={Free} id='showaround_card' />
                                </div>
                                <br/>
                                <br/>

                                <Card.Title style={{ textTransform: 'capitalize' }}>AI Copywriting Tool</Card.Title>
                                <Card.Link >
                                    <Alert severity="info">
                                        <AlertTitle><a><Link to="/ai-blog-writter">Click Here</Link></a></AlertTitle>
                                    </Alert>
                                </Card.Link>
                                <br />

                                <Card.Title style={{ textTransform: 'capitalize' }}>AI Image Generator</Card.Title>
                                <Card.Link >
                                    <Alert severity="info">
                                        <AlertTitle><a><Link to="/ai-images">Click Here</Link></a></AlertTitle>
                                    </Alert>
                                </Card.Link>
                                <br />


                            </div>

                        </div>
                    </Card.Body>
                </div>
            </Card>


        </>
    );
};

export default Freeservices;
