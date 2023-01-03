import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Modal,
    Row,
} from "react-bootstrap";
import "react-phone-number-input/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Showaround from "../components/images/Showaround.png";

const Dashboard = () => {
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const userEmail = localStorage.getItem('userEmail');
    const [showing, setShowing] = useState(false);
    const [show, setShow] = useState(false);
    const location = useLocation();
    const controller = new AbortController();
    ///checkbox values for submitting in database
    const [checkbox4, setCheckbox4] = useState('');
    const [checkbox2, setCheckbox2] = useState('');
    const [checkbox3, setCheckbox3] = useState('');
    //BGN 5/11/2022 ADDITIONAL CHECK Box FOR OMNICHANNEL OFFERING
    const [checkbox5, setCheckbox5] = useState('');
    const [textDetail, settextDetail] = useState('');

    useEffect(() => {
        let isMounted = true;
        window.scrollTo(0, 0);

        const getInterests = async (email, controller) => {
            try {
                const response = await axiosPrivate.get(`/users/interests/${email}`, {
                    signal: controller.signal
                });
                if (response.data.interests.length === 0) {
                    setShow(true); // show the modal
                } else {
                    setShow(false); // don't show the modal
                    setShowing(true);
                }



                // update the events state variable
                isMounted
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        };
        getInterests(userEmail, controller);

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);



    return (
        <div>
            <Modal show={showing}>
                <Modal.Header>
                    <div>
                        <img src={Showaround} id="showaround_card" />
                    </div>
                </Modal.Header>

                <Modal.Body>
                    <div className="accordion-item" id="accordionFlushExample">
                        <div className="accordion-body">
                            <Card.Title style={{ textTransform: "capitalize" }}>
                                For Data Analytics
                            </Card.Title>
                            <Card.Link>
                                <Alert severity="info">
                                    <AlertTitle>
                                        <a>
                                            <Link to="/addworkspace">Datatrunk</Link>
                                        </a>
                                    </AlertTitle>
                                </Alert>
                                <Alert severity="success">
                                    <AlertTitle>
                                        <a>
                                            <Link to="/addmysqldb">Managed Databases</Link>
                                        </a>
                                    </AlertTitle>
                                </Alert>
                            </Card.Link>
                            <br />
                            <Card.Title style={{ textTransform: "capitalize" }}>
                                For E-Commerce Builder
                            </Card.Title>
                            <Card.Link>
                                <Alert severity="info">
                                    <AlertTitle>
                                        <a>
                                            <Link to="/ecommercebuilder">Click Here</Link>
                                        </a>
                                    </AlertTitle>
                                </Alert>
                            </Card.Link>
                            <br />
                            <Card.Title style={{ textTransform: "capitalize" }}>
                                For Omnichannel
                            </Card.Title>
                            <Card.Link>
                                <Alert severity="info">
                                    <AlertTitle>
                                        <a>
                                            <Link to="/omnichannel">Click Here</Link>
                                        </a>
                                    </AlertTitle>
                                </Alert>
                            </Card.Link>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>We need extra details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>What are you interested in?</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        label="Business Analytics"
                                        value="Business Analytics"
                                        onChange={() => {
                                            setCheckbox4("Business Analytics");
                                        }}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Managed Databases"
                                        value="Managed Databases"
                                        onChange={() => {
                                            setCheckbox2("Managed Databases");
                                        }}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Website As Service"
                                        value="Website As Service"
                                        onChange={() => {
                                            setCheckbox3("Website as a Service");
                                        }}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Omnichannel"
                                        value="Omnichannel"
                                        onChange={() => {
                                            setCheckbox5("Omnichannel");
                                        }}
                                    />
                                    <div class="content">
                                        <Form.Group>
                                            <Form.Label>
                                                Anything else?Fill out the details below
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Enter your description"
                                                onChange={(e) => {
                                                    settextDetail(e.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" size="sm" type="submit" block>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            <div>
                <Container>
                    <Row>
                        <div className="Plan">
                            <div className="Plan__left">
                                <h3>Business Analytics</h3>

                                <div
                                    className="Plan__price"
                                    data-tip
                                    data-for="registerTip"
                                    style={{ fontSize: "small" }}
                                >
                                    <p>
                                        <span>
                                            Make Data Driven Decisions With Datatrunk,Today!
                                        </span>
                                        <br />
                                    </p>
                                    <div className="josh">
                                        <Button class="theButton">
                                            <Link to="/addworkspace">Get Started</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="Plan__right">
                                <h3>E-Commerce Builder</h3>

                                <div className="Plan__price" style={{ fontSize: "small" }}>
                                    <p>
                                        <span>
                                            {" "}
                                            Quick Onboarding With Pre-Made, Customizable Themes with
                                            K-Commerce.{" "}
                                        </span>
                                        <br />
                                    </p>
                                    <ul>
                                        <Button class="theButton">
                                            <Link to="/ecommercebuilder">Get Started</Link>
                                        </Button>
                                    </ul>
                                </div>
                            </div>

                            {/* BGN 4/22/2022 Chatwoot card */}

                            <div className="Plan__right">
                                <h3>Omnichannel</h3>

                                <div className="Plan__price" style={{ fontSize: "small" }}>
                                    <p>
                                        <span>
                                            {" "}
                                            TuskeeChat supports all social networks from a single
                                            dashboard.{" "}
                                        </span>
                                        <br />
                                    </p>
                                    <ul>
                                        <Button class="theButton">
                                            <Link to="/omnichannel">Get Started</Link>
                                        </Button>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Dashboard;
