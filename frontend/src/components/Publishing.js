
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ReactPlayer from 'react-player';


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
                  <Form.Group>
                    <Button class='theButton'>< a href="https://linkedin.ndovucloud.com">Click Here to Access</a></Button>
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

export default Publishing
