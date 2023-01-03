import Axios from 'axios';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import TuskeechatPro from './TuskeechatPro';
import TuskeechatStarter from './TuskeechatStarter';
import "../Dashboard.css";


const TuskeechatPlans = () => {

    const user_Email = localStorage.getItem('userEmail');
    const requestCustomTuskeeFunction = () => {
        Axios.post("https://backend.droplets.ndovucloud.com/api/requestCustomTuskeechat", {
            requester_email: user_Email

        });
    };
    return (
        <div >

            <div>
                <Container>
                    <Row>
                        <Col sm={4}>
                            <div className="Plan" id='Tuskeechat_Card'>
                                <div className="Plan__right">
                                    <h3> Starter Package</h3>

                                    <div className="Plan__price" style={{ fontSize: 'small' }}>

                                        <Form.Group>
                                            {/* <div>
                                                <img src={Logo} id='Payment_card' />
                                            </div> */}
                                            <h4>29.99 $ Per Agent/Month</h4>
                                            <span>27.99 $ Per Agent/Annum </span>
                                            <br />

                                            <span>Email Integration</span>
                                            <br />
                                            <span>Instagram  Integration</span>
                                            <br />
                                            <span>Line Integration</span>
                                            <br />
                                            <span>Sms Integration</span>
                                            <br />
                                            <span>Facebook Integration</span>
                                            <br />
                                            <span>Knowledgebase</span>
                                            <br />
                                            <span>Twitter Integration</span>
                                            <br />
                                            <span>Inbox analytics</span>
                                            <br />
                                            <span>Community Forums</span>
                                            <br />
                                            <span>CSAT Surveys and Reports- customer satisfaction</span>
                                            <br />
                                            <span>Mobile Application</span>
                                            <br />
                                            <span>Roles and permissions</span>
                                            <br />
                                            <span>Campaigns</span>
                                            <br />
                                            <span>Audio Notifications</span>
                                            <br />
                                            <span>Unified Customer Record</span>
                                            <br />
                                            <span>Contact Management</span>
                                            <br />
                                           



                                            <TuskeechatStarter user_Email={user_Email} >  </ TuskeechatStarter>

                                        </Form.Group>
                                    </div>


                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="Plan" id='Tuskeechat_Card'>
                                <div className="Plan__right">
                                    <h3> Pro Package</h3>

                                    <div className="Plan__price" style={{ fontSize: 'small' }}>
                                        <Form.Group>
                                            <h4>69.99 $ Per Agent/Month</h4>
                                            <span>67.99 $ Per Agent/Annum</span>
                                            <br />
                                            <span>All Starter plan Features</span>
                                            <br />
                                            <span>24/7 Email Support</span>
                                            <br />
                                            <span>24/5 Phone Support</span>
                                            <br />
                                            <span>Bot Integration - DialogFlow</span>
                                            <br />
                                            <span>Automations - Follow Ups, Agent Assignments</span>
                                            <br />
                                            <span>Teams - divide your agents into departments</span>
                                            <br />
                                            <span>Private Notes</span>
                                            <br />
                                            <span>Client Conversation Script</span>
                                            <br />
                                            <span>Conversations Labeling</span>
                                            <br />
                                            <span>Mobile Application</span>
                                            <br />
                                            <span>360 -degree view of customer</span>
                                            <br />
                                            <span>CSAT Surveys and Reports</span>
                                            <br />
                                            <span>Inbox analytics</span>
                                            <br />

                                            <TuskeechatPro user_Email={user_Email} >  </ TuskeechatPro>

                                        </Form.Group>
                                    </div>


                                </div>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="Plan" id='Tuskeechat_Card'>
                                <div className="Plan__right">
                                     <h3> Custom Package</h3>
                                       <div className="Plan__price" style={{ fontSize: 'small' }}>
                                        <h4>Custom Price</h4>
                                        <span>ALL PRO PACKAGE FEATURES PLUS</span>
                                        <br />
                                        <span>Custom  Widget Integration</span>
                                        <br />
                                        <span>Custom Domain</span>
                                        <br />
                                        <span>Whitelabelling</span>
                                        <br />
                                        <span>Custom Attributes for client details</span>
                                        <br />
                                        <span>API Capability</span>
                                        <br />
                                        <span>Unlimited Agents</span>
                                        <br />
                                        <span>Unlimited Messages</span>
                                        <br />
                                        <span>SSO Integration</span>
                                        <br />
                                        <span>Email ,Call and WhatsApp Support</span>
                                        <br />
                                        <span>24/7 Email Support</span>
                                        <br />
                                        <span>24/5 Phone Support</span>
                                        <br />
                                        <Button className='mr-2' variant="warning" size='sm' onClick={requestCustomTuskeeFunction}>Contact Sales</Button>

                                    </div>


                                </div>
                            </div>
                        </Col>

                    </Row>

                </Container>
            </div>
        </div>
    )
}

export default TuskeechatPlans
