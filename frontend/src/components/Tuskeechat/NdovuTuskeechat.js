
import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";
import "../Dashboard.css";

const NdovuTuskeechat = () => {

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
                <h3>OmniChannel</h3>

                <div className="Plan__price" style={{ fontSize: 'small' }}>
                  <p>
                    <span>Whatsapp, Email, Twitter, and Telegram all from a single TuskeeChat dashboard.</span>
                    <br />

                  </p>
                  <Form.Group>
                    {/* <button class='theButton'>< a href="https://pay.ndovucloud.com/purchase/">Buy Tuskeechat </a></button>{" "} */}
                    <Button class='theButton'><Link to="/payTuskeechat">Buy Tuskeechat</Link></Button>{" "}
                   

                    <Button class='theButton'>< a href="https://tuskeechat.ndovucloud.com/app/login">Tuskeechat Login</a></Button>

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
              <ReactPlayer height="720" width="300" url='https://youtu.be/fMnzygrMkF0' />
            </div>

          </Col>

          <Col style={{ padding: '1px 4px 2px 1px ' }} sm={4}>
            <div style={{ width: '300%', height: '100%' }}>
              <ReactPlayer height="720" width="300" url='https://youtu.be/URL23ZkcenI' />
            </div>
          </Col>

        </Col>

      </Card>
    </>
  )
}

export default NdovuTuskeechat
