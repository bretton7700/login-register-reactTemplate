
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ReactPlayer from 'react-player';


import "../Dashboard.css";


const Blogwritter = () => {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])




    return (
        <>

            <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
                <Container style={{ float: 'left', alignItems: 'center' }}>
                    <Row>
                        <div className="Plan">
                            <div className="Plan__right">
                                <h3>Free AI Blog Writter</h3>

                                <div className="Plan__price" style={{ fontSize: 'small' }}>
                                    <p>
                                        <span>Improve your Blogs By 90% using SEO optimized Content that this tool produces for You.</span>
                                        <br />

                                    </p>
                                    <Form.Group>
                                        <Button class='theButton'>< a href="https://copywriting.ndovucloud.com">Click Here to Access</a></Button>
                                    </Form.Group>
                                </div>


                            </div>
                        </div>
                    </Row>
                </Container>
            </Card>


            <Card id='videos_Card' className="border-ndovu rounded-0 my-3" style={{ margin: '0 0 0 40px', float: 'right', alignItems: 'center' }}>
                <Col>

                    <Col style={{ padding: '1px 4px 2px 2px ' }} sm={4}>
                        <div style={{ width: '300%', height: '100%' }}>
                            <ReactPlayer height="720" width="300" url='https://youtu.be/xnAWq4gf7Gg' />
                        </div>

                    </Col>


                </Col>



            </Card>
        </>
    )
}

export default Blogwritter
