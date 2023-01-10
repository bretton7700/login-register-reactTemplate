
import React, { useEffect, useState, useRef } from "react";
import { Card, Col, Form, Dropdown, Modal, Row } from "react-bootstrap";
import '../sidebar.css';
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const ARYSHARE_URL = '/aryshare/publish';

const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)

const Post = () => {

  const axiosPrivate = useAxiosPrivate();

  const [showing, setShowing] = useState(false);

  const handleShowing = () => setShowing(true);
  const handleClosing = () => setShowing(false);

  const [description, setDescription] = useState('')
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [ImageUrl, setImageUrl] = useState('');

  const handleCheckboxChange = (event) => {
    const { name } = event.target;

    if (selectedCheckboxes.includes(name)) {
      setSelectedCheckboxes(selectedCheckboxes.filter(checkbox => checkbox !== name));
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    }
  };

  const checkImageUrl = (url) => {
    // Regular expression to check if the url is in correct format
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    return urlRegex.test(url);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])




  const SendPost = async (event) => {
    event.preventDefault();
    const descriptionWords = description.split(' ');

    // LinkedIn doesn't take more than 700 words
    if (descriptionWords.length > 700) {
      alert('The description cannot exceed 700 words');
      return;
    }
    if (description.length === 0) {
      alert('Please fill in the details');
      return;
    }

    // Check if at least one checkbox is selected
    if (selectedCheckboxes.length === 0) {
      alert("please select atleast one checkbox")
      return
    }

    // include the videos or images in the request body, depending on what the user has entered
    let requestBody;

    requestBody = {
      description: description,
      selectedCheckboxes: selectedCheckboxes
    };

    // Check if the image url is in correct format
    if (ImageUrl && !checkImageUrl(ImageUrl)) {
      alert("Please enter a valid image url");
      setImageUrl('');
      return;
    } else {
      requestBody.imageUrl = ImageUrl;
    }

    try {
      const postResponse = await axiosPrivate.post(ARYSHARE_URL, JSON.stringify(requestBody), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      console.log(JSON.stringify(postResponse?.data));
      setDescription('');
      setSelectedCheckboxes([]);
      setImageUrl('');
      handleShowing();
      setTimeout(handleClosing, 2000);
    } catch (error) {
      console.error(error);
    }
  };








  return (
    <>
      <div>
        <Modal show={showing} >
          <Modal.Body>

            <div className="accordion-item" id="accordionFlushExample">

              <div className="accordion-body">
                <Card.Title>  successfully Sent Post</Card.Title>

              </div>

            </div>

          </Modal.Body>
        </Modal>
      </div>



      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Send Post</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col sm={6}>
                <textarea rows="15" wrap="soft" placeholder="Enter Your text" name="description" value={description} required onChange={(e) => { setDescription(e.target.value); }} />
              </Col>
            </Row>

            <Form.Group>
              <Form.Label>Add IMAGE URL</Form.Label>
              <Form.Control type="url" placeholder="Enter Image  URL" name="url" value={ImageUrl} onChange={(e) => { setImageUrl(e.target.value); }} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Channel</Form.Label>
              <Form.Check
                type="checkbox"
                label="LinkedIn"
                name="linkedin"
                onChange={handleCheckboxChange}
                defaultChecked={false}
              />
              <Form.Check
                type="checkbox"
                label="Facebook"
                name="facebook"
                onChange={handleCheckboxChange}
                defaultChecked={false}
              />
              <Form.Check
                type="checkbox"
                label="Instagram"
                name="instagram"
                onChange={handleCheckboxChange}
                defaultChecked={false}
              />


            </Form.Group>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Choose One
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={SendPost}>Share Now</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
        </Card.Body>
      </Card>


    </>
  );
};

export default Post;
