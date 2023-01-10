import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";


const DeleteDatabase = ({ Current_Workspace_Name }) => {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const handleShowing = () => setShowing(true);
  const handleClosing = () => setShowing(false);
  
  const handleShow = () => setShow(true);
  
  const handleClose = () => setShow(false);
  
  const [databaseList, setdatabaseList] = useState([]);
  

  useEffect(() => {
    Axios.get("https://backend.droplets.ndovucloud.com/api/getDatabaseToDelete", {
      params: {

        
        Database_Name:  `${Current_Workspace_Name}`,
      },
    }).then((response) => {
      setdatabaseList(response.data);
    });
  }, [Current_Workspace_Name, databaseList]);

  
  const deleteDatabase = (Database) => {
    Axios.delete(`https://backend.droplets.ndovucloud.com/api/deleteDatabase/${Database}`);
    const newDatabase = databaseList.filter((database) => database.databaseName !== Database);
    setdatabaseList(newDatabase);
    handleClose();

    
    handleShowing();
    setTimeout(function () {

      handleClosing();

    }, 1000);


  };

  //member list
  return (
    <>
      <Button className='mr-2' variant="danger" size="sm" onClick={handleShow}>Delete</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {databaseList.map((val, index) => {
            return (
              <div className="accordion-item" id="accordionFlushExample" key={index}>
                <div id={"flush-" + index} className="accordion-collapse collapse show" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <Card.Title>Are you sure you want to delete {val.databaseName} ?</Card.Title>
                    <Form>
                      <Form.Group>
                        <Button variant="danger" size="sm" onClick={() => { deleteDatabase(val.databaseName) }}>Yes</Button>{" "}
                        <Button variant="primary" size="sm" onClick={handleClose}>NO</Button>
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            );
          }
          )}
        </Modal.Body>
      </Modal>


      <Modal show={showing} >
        <Modal.Body>
        {databaseList.map((val, index) => {
            return (
              <div className="accordion-item" id="accordionFlushExample" key={index}>
                <div id={"flush-" + index} className="accordion-collapse collapse show" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <Card.Title> You have successfully Deleted {val.databaseName} ?</Card.Title>
                   
                  </div>
                </div>
              </div>
            );
          }
          )}



        </Modal.Body>
      </Modal>



    </>
  )
}

export default DeleteDatabase
