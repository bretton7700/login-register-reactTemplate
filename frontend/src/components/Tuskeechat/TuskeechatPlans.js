import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {  Button,  Container,  Card, Col, Form, Modal, Row } from "react-bootstrap";

import TuskeechatPro from './TuskeechatPro';
import TuskeechatStarter from './TuskeechatStarter';
import  {  useState } from "react";
import "../Dashboard.css";
const PREMIUM_URL = '/users/requestPremium';
const TuskeechatPlans = () => {
    const axiosPrivate = useAxiosPrivate();
    const [showing, setShowing] = useState(false);

    const user_Email = localStorage.getItem('userEmail');
    const requestCustomTuskeechat = async () => {
       
        try {
          
    
          // Make a post request and wait for it to resolve
          const postResponse = await axiosPrivate.post(PREMIUM_URL,
            JSON.stringify({
                suitName: 'Tuskeechat',
                requesterEmail: user_Email
             
            }), {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          });
    
          // TODO: remove console.logs before deployment
          console.log(JSON.stringify(postResponse?.data));

          setShowing(true);
          setTimeout(setShowing(false), 2000);
    
        
        } catch (error) {
          if (!error.response) {
            alert('No server response');
          } else {
            alert('request failed');
          }
        }
      };
    
   
    return (
        <div >
             <div>
        <Modal show={showing} >
          <Modal.Body>

            <div className="accordion-item" id="accordionFlushExample">

              <div className="accordion-body">
                <Card.Title>  successfully Sent Request</Card.Title>

              </div>

            </div>

          </Modal.Body>
        </Modal>
      </div>

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
                                        <Button className='mr-2' variant="warning" size='sm' onClick={requestCustomTuskeechat}>Contact Sales</Button>

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
