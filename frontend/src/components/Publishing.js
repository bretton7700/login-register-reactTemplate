
import React, { useEffect } from "react";
import {  Card, Container, Row } from "react-bootstrap";


import { Link } from 'react-router-dom';


import "./Dashboard.css";


const Publishing = () => {


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
                <h3>Free Linkedin Publisher</h3>

                <div className="Plan__price" style={{ fontSize: 'small' }}>
                  <p>
                    <span>Publish Content For Free .</span>
                    <br />

                  </p>

                  <p style={{color:'blue'}}>
                
                <span className="line">
                <Link to="/linkedinauthenticate">Click Here To Access Linkedin</Link>
                </span>
                </p>
                  
                </div>


              </div>
            </div>
          </Row>
        </Container>
      </Card>


   
    </>
  )
}

export default Publishing
