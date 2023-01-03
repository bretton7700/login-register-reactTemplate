import React, { useEffect } from "react";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import "../Dashboard.css";

const ImageGenerator = () => {


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
                <h3>Free AI Image Generator</h3>

                <div className="Plan__price" style={{ fontSize: 'small' }}>
                  <p>
                    <span>Get Images in Seconds Using AI.No more Scratching your head trying to come up with Images</span>
                    <br />

                  </p>
                  <Form.Group>
                    <Button class='theButton'>< a href="https://ai.ndovucloud.com">Click Here to Access</a></Button>
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

export default ImageGenerator
