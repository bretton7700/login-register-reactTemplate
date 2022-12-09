
import React, { useEffect } from "react";
import {  Card, Container, Form, Row } from "react-bootstrap";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../Dashboard.css"


const Linkedinauthenticate = () => {

 
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

 
const handleSubmit = async () => {

  try{
    await axiosPrivate.get("https://backendapp.ndovucloud.com/linkedin").then((response) => {
      window.location.replace(response.data);
  })
  } catch(err){
    console.log(err);
  }
 
    
}

  return (
    <>

      <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
        <Container style={{ float: 'left', alignItems: 'center' }}>
          <Row>
            <div className="Plan">
              <div className="Plan__right">
                <h3>Authenticate Your linkedin Account</h3>

                <div className="Plan__price" style={{ fontSize: 'small' }}>
                  <p>
                    <span>Publish Content For Free .</span>
                    <br />

                  </p>
                 
                  <Form.Group>
                  <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>Authenticate </button>
                  </Form.Group>

                 
                </div>


              </div>
            </div>
          </Row>
        </Container>
      </Card>


      
    </>
  )
}

export default Linkedinauthenticate
