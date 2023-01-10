import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Modal, Row } from "react-bootstrap";
import "./PalModal.css";
import PayPal from "./PayPal";
import ProPayPal from "./ProPayPal";


// import PayMpesa from "./PayMpesa";


const PalModal = ({ Current_Workspace_Name }) => {





  const requester_Email = global.mail;
  const suitName = 'datatrunk'
  //
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  const [shower, setShowing] = useState(false);
  const [shower2, setShowing2] = useState(false);

  //
  const [showing, setShowing3] = useState(false);
  const handleShowing = () => setShowing3(true);
  const handleClosing = () => setShowing3(false);

  //button
  const [buttonText, setbuttonText] = useState('Buy Datatrunk');
  ///slider

  const [value, setValue] = React.useState(1);
  const [cost, setCost] = React.useState(1);
  const [period, setPeriod] = React.useState(12);
  const [timepaid, settimepaid] = React.useState(12);

  const handletimepaid = (event, newtimepaid) => {
    settimepaid(newtimepaid);
  };


  const handlePeriod = (event, newPeriod) => {
    setPeriod(newPeriod);
  };



  const handleCost = (event, newCost) => {
    setCost(newCost);
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //the Starter pack  amount 
  const Starter_Payment_Amount = (value * period * 12.99).toFixed(2)
  //the pro amount
  const Pro_Payment_Amount = (cost * timepaid * 57.99).toFixed(2)


  

  useEffect(() => {
    Axios.get("https://backend.droplets.ndovucloud.com/api/getpaymentflagforbutton",
      {
        params: {
          Workspace_Name: Current_Workspace_Name,
        },
      })
      .then((response) => {
        const data = response.data;
        
        if (data.length === 0) {
          setbuttonText('Upgrade Datatrunk');
          

        }
      })


  }, [])

  //submit function anytime we click button
  const submitPremium = () => {
    Axios.post("https://backend.droplets.ndovucloud.com/api/insertPremium",
      {
        requester_Email: requester_Email,
        product_Picked: suitName
      });

    handleShowing();
    setTimeout(function () {

      handleClosing();

    }, 1000);

  }

  return (
    <>





      <Modal show={showing} >
        <Modal.Body>

          <div className="accordion-item" id="accordionFlushExample">

            <div className="accordion-body">
              <Card.Title> You have successfully Submitted your Datatrunk Request</Card.Title>

            </div>

          </div>

        </Modal.Body>
      </Modal>

      <Button className='mr-2' variant="success" size="sm" onClick={handleShow}>
        {buttonText}
      </Button>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Payments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <div className="paymentPlan">
                <div className="paymentPlan__left">
                  <h3>Starter Plan</h3>
                  {/* <h4>57.99 $/Month</h4> */}
                  <h4>{Starter_Payment_Amount} $/Month</h4>
                  <h4>Billed Annually</h4>
                  <div className="paymentPlan__price" style={{ fontSize: 'small' }}>
                    <p>
                      <h6>Select No. of Users</h6>
                      <br />
                      <Box sx={{ width: 100 }}>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={1}
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={1}
                          max={30}
                        />

                      </Box>
                      <br />
                      <h6> Payment Period(In Months)</h6>
                      <br />
                      <Box sx={{ width: 100}}>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={1}
                          value={period}
                          onChange={handlePeriod}
                          valueLabelDisplay="auto"
                          step={1}
                          marks
                          min={1}
                          max={12}
                        />

                      </Box>
                      <br />

                      <span>Unlimited Dashboards</span>
                      <br />
                      <span>More than 50 charts</span>
                      <br />

                      <span>1 Workspace</span>
                      <br />
                      <span>Connect to 10 Datasources</span>
                      <br />
                      <span>Dashboard Css Templating</span>
                      <br />
                      <span>Artificial intelligence</span>
                      <br />

                      <span>Instant Data  Refreshes</span>
                      <br />
                      <span>Data Encryption</span>
                      <br />
                      <span>Single Sign On</span>
                      <br />
                      <span>Fully Cloud</span>
                      <br />
                      <span>DataAnalyst 2hrs/Month</span>
                      <br />
                      <span>Training 5hrs/first 30 days</span>
                      <br />
                      <span>Support via Email and call</span>
                      <br />
                      <span>Rows of data 10,000</span>
                      <br />
                      <span>Data Space 2GB </span>
                      <br />
                      <span>Sql Editor </span>
                      <br />
                      <span>Training and support virtually </span>
                      <br />
                      <span>Dataflow(clientDB-Datatrunk) </span>
                    </p>

                  </div>

                  <Button onClick={() => {
                    setShowing(true);
                  }}>Buy Starter</Button>
                  {shower ? <PayPal current_Starter_Workspace={Current_Workspace_Name} Starter_Payment_Amount={Starter_Payment_Amount} value={value} Period_Paid ={period}> </PayPal  > : <p>:</p>}
                  
                </div>

     
                <div className="paymentPlan__center">
                  <h3>Pro Plan</h3>
                  <h4>{Pro_Payment_Amount} $/Month</h4>
                  <h4>Billed Annually</h4>
                  <div className="paymentPlan__price" style={{ fontSize: 'small' }}>
                    <p>
                      <h6>Select No. of  Users</h6>
                      <br />
                      <Box sx={{ width: 100 }}>
                      <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        value={cost}
                        onChange={handleCost}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={30}
                      />

                    </Box>
                    <br/>

                    <h6> Payment Period(In Months)</h6>
                      <br />
                      <Box sx={{ width: 100 }}>
                      <Slider
                        aria-label="Temperature"
                        defaultValue={1}
                        value={timepaid}
                        onChange={handletimepaid}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={12}
                      />

                    </Box>
                    <br/>


                      <span>All features on Starter plan  Plus</span>
                      <br />

                      <span>2 Workspace</span>
                      <br />
                      <span>Connect to 20 Datasources</span>
                      <br />
                      <span>Role Based Access Control</span>
                      <br />
                      <span>Predictive Analysis</span>
                      <br />
                      <span>Artificial Intelligence</span>
                      <br />
                      <span>Machine Learning</span>
                      <br />
                      <span>Instant Data Refreshes</span>
                      <br />
                      <span>Data Security</span>
                      <br />
                      <span>Single Sign On</span>
                      <br />
                      <span>DataAnalyst 3hrs/Month</span>
                      <br />
                      <span>Training 10hrs/first 30 days</span>
                      <br />
                      <span>Support via Email and call</span>
                      <br />
                      <span>100,000 Data Rows</span>
                      <br />
                      <span>Data Space 3GB</span>
                      <br />
                      <span>Sql Editor </span>
                      <br />
                      <span>Training and support virtually </span>
                      <br />
                      <span>Dataflow(clientDB-Datatrunk) </span>
                    </p>
                    
                  </div>
                  <Button onClick={() => { setShowing2(true); }} >Buy Pro</Button>
                  {shower2 ? <ProPayPal Current_Pro_Workspace={Current_Workspace_Name} Pro_Payment_Amount={Pro_Payment_Amount} Users_Paid_For={cost} Period_Paid_Pro={timepaid} >  </ProPayPal> : <p>:</p>}
                  
                  
                
                </div>

                <div className="paymentPlan__right">
                  <h3>Premium Plan</h3>
                  <h4>Custom Pricing</h4>
                  <div className="paymentPlan__price" style={{ fontSize: 'small' }}>
                    <p>
                      <span>All Features on Business Plan Plus</span>
                      <br />
                      <span>Connect to Over 50 Datasources</span>
                      <br />
                      <span>Predictive Analysis</span>
                      <br />
                      <span>Artificial Intelligence</span>
                      <br />
                      <span>Machine learning</span>
                      <br />
                      <span>Instant Data refreshes</span>
                      <br />
                      <span>Data Security</span>
                      <br />
                      <span>Fully Cloud</span>
                      <br />
                      <span>Single Sign On</span>
                      <br />
                      <span>Data Encryption</span>
                      <br />
                      <span>Enterprise Support</span>
                      <br />
                      <span>Data Warehouse Integration</span>
                      <br />
                      <span>DataAnalyst </span>
                      <br />
                      <span>Training </span>
                      <br />
                      <span>Support via Email and call and Whatsapp</span>
                      <br />
                      <span>custom no. of  Data Rows</span>
                      <br />
                      <span> Custom Data Space</span>
                    </p>
                  </div>
                  <Button onClick={() => { submitPremium(); }} >Request Premium</Button>
                  {/* <Premium />{' '} */}

                </div>
              </div>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PalModal;
