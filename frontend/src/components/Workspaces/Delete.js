import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
const Delete = ({ Current_Workspace_Name }) => {
  const [show, setShow] = useState(false);
  const [showing, setShowing] = useState(false);
  const handleShowing = () => setShowing(true);
  const handleClosing = () => setShowing(false);
  
  const handleShow = () => setShow(true);
  
  const handleClose = () => setShow(false);
  
  const [WorkspaceList, setWorkspaceList] = useState([]);
 

  useEffect(() => {
    Axios.get("https://backend.droplets.ndovucloud.com/api/getWhatToDelete", {
      params: {

    
        workspace_Name: Current_Workspace_Name,
      },
    }).then((response) => {
      setWorkspaceList(response.data);
    });
  }, [Current_Workspace_Name, WorkspaceList]);

 
  const deleteWorkspace = (Workspace) => {
    Axios.delete(`https://backend.droplets.ndovucloud.com/api/delete/${Workspace}`);
    const newWorkspace = WorkspaceList.filter((workspace) => workspace.Workspace_Name !== Workspace);
    setWorkspaceList(newWorkspace);
    handleClose();

    
    handleShowing();
    setTimeout(function () {

      handleClosing();

    }, 1000);


  };

  //member list
  return (
    <>
      <Button className='mr-2' variant="danger" size="sm" onClick={handleShow}>Delete Workspace</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          {WorkspaceList.map((val, index) => {
            return (
              <div className="accordion-item" id="accordionFlushExample" key={index}>
                <div id={"flush-" + index} className="accordion-collapse collapse show" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <Card.Title>Are you sure you want to delete {val.Workspace_Name} ?</Card.Title>
                    <Form>
                      <Form.Group>
                        <Button variant="danger" size="sm" onClick={() => { deleteWorkspace(val.Workspace_Name) }}>Yes</Button>{" "}
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
        {WorkspaceList.map((val, index) => {
            return (
              <div className="accordion-item" id="accordionFlushExample" key={index}>
                <div id={"flush-" + index} className="accordion-collapse collapse show" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">
                    <Card.Title> You have successfully Deleted {val.Workspace_Name} ?</Card.Title>
                   
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

export default Delete
