
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Dropdown, Modal, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../sidebar.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const PUBLISH_URL = '/linkedin/publish';
const SCHEDULE_URL = '/linkedin/schedule';
const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)

const Linkedinpost = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get("code")
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [showing, setShowing] = useState(false);

  const handleShowing = () => setShowing(true);
  const handleClosing = () => setShowing(false);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (description.length === 0) {
      alert('please fill in the description')
    }
    else {
      setShow(true)
    }
  }

  const handleClose = () => setShow(false);
  const [images, setImages] = useState({}); // state to store selected images

  const [description, setDescription] = useState('')
  const [postDate, setPostDate] = useState(null); // date and time for new post



  const handleImageSelection = (event) => {
    const files = event.target.files;

    // validate file size
    const maxFileSize = 200 * 1024 * 1024; // 200 MB
    const invalidFileSize = Array.from(files).some((file) => file.size > maxFileSize);
    if (invalidFileSize) {
      alert('One or more of the selected files exceeds the maximum file size of 200 MB');
      return;
    }

    // validate file type
    const invalidFileType = Array.from(files).some((file) => !file.type.startsWith('image/') && file.type !== 'video/mp4');
    if (invalidFileType) {
      alert('One or more of the selected files is not an image or video file');
      return;
    }

    // create thumbnails for images and videos
    const thumbnails = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        if (file.type.startsWith('image/')) {
          // create thumbnail for image
          const reader = new FileReader();
          reader.onload = () => {
            const image = new Image();
            image.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = 100;
              canvas.height = 100;
              ctx.drawImage(image, 0, 0, 100, 100);
              resolve({ file, dataURL: canvas.toDataURL() });
            };
            image.src = reader.result;
          };
          reader.readAsDataURL(file);
        } else if (file.type === 'video/mp4') {
          // create thumbnail for video
          const video = document.createElement('video');
          video.onloadeddata = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 100;
            canvas.height = 100;
            ctx.drawImage(video, 0, 0, 100, 100);
            resolve({ file, dataURL: canvas.toDataURL() });
          };
          video.src = URL.createObjectURL(file);
        } else {
          reject(new Error('Invalid file type'));
        }
      });
    });

    Promise.all(thumbnails).then((results) => {
      // store selected images and videos in the state
      const images = results.filter((result) => result.file.type.startsWith('image/')).map((result) => result.dataURL);
      const videos = results.filter((result) => result.file.type === 'video/mp4').map((result) => result.dataURL);
      setImages({ images, videos });
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.get("/linkedin/callback", {
        params: {
          code: code,
        },
      });

      // Wait for the get request to resolve
      const response = await axiosPrivate.get("/linkedin/userID");
      // Set the userID variable using the response data

      // Make a post request and wait for it to resolve
      const postResponse = await axiosPrivate.post(SCHEDULE_URL,
        JSON.stringify({
          description: description,
          scheduleTime: postDate,
          owner: userEmail
        }), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(postResponse?.data));

      setDescription('');
      handleClose();
      navigate('/linkedincalendar', { replace: true });
    } catch (error) {
      if (!error.response) {
        alert('No server response');
      } else {
        alert('Scheduling failed');
      }
    }
  };


  const SendPost = async (event) => {
    event.preventDefault();
    const descriptionWords = description.split(' ');
    // LinkedIn doesn't take more than 700 words
    void (descriptionWords.length > 700 ? alert('The description cannot exceed 700 words') : null);
    void (description.length === 0 ? alert('please fill in the details') : null);

    // separate the images and videos in the images array
    const imageURLs = images.filter((image) => image.file.type.startsWith('image/')).map((image) => image.dataURL);
    const videoURLs = images.filter((image) => image.file.type === 'video/mp4').map((image) => image.dataURL);

    // include the videos or images in the request body, depending on what the user has selected
    let requestBody;
    if (videoURLs.length > 0 && imageURLs.length > 0) {
      requestBody = {
        description: description,
        videos: videoURLs, // array of video URLs
        images: imageURLs // array of image URLs
      };
    } else if (videoURLs.length > 0) {
      requestBody = {
        description: description,
        videos: videoURLs // array of video URLs
      };
    } else if (imageURLs.length > 0) {
      requestBody = {
        description: description,
        images: imageURLs // array of image URLs
      };
    } else {
      requestBody = {
        description: description
      };
    }

    try {
      await axiosPrivate.get("/linkedin/callback", {
        params: {
          code: code,
        },
      });

      // Wait for the get request to resolve
      const response = await axiosPrivate.get("/linkedin/userID");
      // Set the userID variable using the response data

      // Wait for the post request to resolve
      const postResponse = await axiosPrivate.post(PUBLISH_URL,
        JSON.stringify(requestBody), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      console.log(JSON.stringify(response?.data));
      setDescription('');
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

      <div>
        <Modal show={show} >
          <Modal.Body>

            <div className="accordion-item" id="accordionFlushExample" >
              <div className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  <Card.Title>Select A Date and Time</Card.Title>
                  <Form>
                    <Form.Group style={{ paddingBottom: '2em' }}>
                      <DatePicker
                        selected={postDate}
                        onChange={date => setPostDate(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Button variant="danger" size="sm" onClick={handleSchedule}>Schedule</Button>{" "}
                    </Form.Group>
                  </Form>

                </div>
              </div>
            </div>

          </Modal.Body>
        </Modal>
      </div>

      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Send Post</Card.Header>
        <Card.Body>
          <Form >


            <Row>


              <Col sm={6}>

                <textarea rows="15" wrap="soft" placeholder="Enter Your text" name="description" value={description} required onChange={(e) => { setDescription(e.target.value); }} />
              </Col>
              <Col md={6}>
                <input type="file" multiple onChange={handleImageSelection} />
                {/* display selected images */}
                {images.images.map((image) => (
                  <img
                    src={image}
                    alt="Selected Image"
                    style={{ height: '100px', width: '100px' }}
                  />
                ))}
                {/* display selected videos */}
                {images.videos.map((video) => (
                  <video
                    src={video}
                    alt="Selected Video"
                    style={{ height: '100px', width: '100px' }}
                    controls
                  />
                ))}
              </Col>

            </Row>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Choose One
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={SendPost}>Share Now</Dropdown.Item>
                <Dropdown.Item onClick={handleShow}>Schedule Post</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* <Button variant="primary" size="sm" type="submit" id='share' >Share Now</Button>{" "} */}
          </Form>



        </Card.Body>
      </Card>

    </>
  );
};

export default Linkedinpost;
