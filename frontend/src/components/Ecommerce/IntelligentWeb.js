import React, { useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import ReactPlayer from 'react-player';
import "../Dashboard.css";

const IntelligentWeb = () => {
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
                <h3>E-Commerce  Builder</h3>

                <div className="Plan__price" style={{ fontSize: 'small' }}>
                  <p>
                    <span>Quick onboarding that starts with pre-made, customizable themes on K-Commerce.</span>
                    <br />

                  </p>
                  <Form.Group>
                    <button class='theButton'>< a href="https://ndovu.sites.ndovucloud.com/register/">Buy K-Commerce </a></button>{" "}
                    <button class='theButton'>< a href="https://ndovu.sites.ndovucloud.com/login/">My k-Commerce  </a></button>

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
              <ReactPlayer height="720" width="300" url='https://youtu.be/G-CPAINfFm8' />
            </div>

          </Col>

          <Col style={{ padding: '1px 4px 2px 1px ' }} sm={4}>
            <div style={{ width: '300%', height: '100%' }}>
              <ReactPlayer height="720" width="300" url='https://youtu.be/fVfwOc9lU_I' />
            </div>
          </Col>

        </Col>

      </Card>
    </>
  )
}

export default IntelligentWeb
