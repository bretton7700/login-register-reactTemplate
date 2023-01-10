import { Alert, AlertTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { CirclesWithBar } from 'react-loader-spinner';
import { useNavigate, } from 'react-router-dom';
import '../WorkspaceList.css';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)

const userCompany = localStorage.getItem('company');
console.log(userCompany)

const CheckUniqueWorkspaces_URL = '/users/uniqueWorkspaces';
const AvailableWorkspaceTrials_URL = '/users/availableTrials';
const CreateWorkspace_URL = '/users/createWorkspace';
///
const AddWorkspace = () => {
    const axiosPrivate = useAxiosPrivate();
    const [Workspace_Name, setWorkspaceName] = useState('');
    const navigate = useNavigate();
    const [Workspace_Description, setWorkspaceDescription] = useState('');
    
    const Workspace_Email = userEmail;
  

    //Suitname is the suit of product they are picking from the company
    const suitName = 'datatrunk';
    const status = 'Trial';


    //
    const [showing, setShowing3] = useState(false);
    const handleShowing = () => setShowing3(true);
    const handleClosing = () => setShowing3(false);
  

    useEffect(() => {
        


    }, []);

    //submit function for the workspaces
    const submitWorkspace = (event) => {

        event.preventDefault();
        axiosPrivate.get(`${CheckUniqueWorkspaces_URL}/${Workspace_Name}`,
            {
                params: {
                    Workspace_Name: Workspace_Name,
                },
            })
            .then((response) => {
                const data = response.data;
                console.log(data);
                if (data.length === 0) {
                    if (Workspace_Name.length === 0 | Workspace_Description.length === 0) {
                        alert('please fill in details')
                    }
                    else {
                        axiosPrivate.get(`${AvailableWorkspaceTrials_URL}/${suitName}/${status}/${userCompany}`,
                            {
                                params: {
                                    suit: suitName,
                                    status: status,
                                    company: userCompany
                                },
                            }).then((response) => {
                                const data = response.data;
                                const number = data.length

                                if (number !== 0) {
                                    alert('kindly purchase Datatrunk you have exhausted your trials')

                                    setWorkspaceName('')
                                    setWorkspaceDescription('');

                                    navigate('/datatrunk', { replace: true });
                                } else {
                                    
                                    axiosPrivate.post(CreateWorkspace_URL, {
                                            Workspace_Name: Workspace_Name,
                                            Workspace_Description: Workspace_Description,
                                            Workspace_Email: Workspace_Email,
                                            company_Name: userCompany,
                                            suitName: suitName,
                                            status: status
                                        })

                                       
                                        setWorkspaceName('')
                                        setWorkspaceDescription('');
                                        handleShowing();
                                        setTimeout(function () {

                                            handleClosing();
                                            navigate('/datatrunk', { replace: true });

                                        }, 29000);

                                    



                                }

                            })



                    }



                } else {
                    alert("Workspace Name has already been taken!");
                    setWorkspaceName('')
                    setWorkspaceDescription('');
                }
            })

    }



    return (
        <>

            <Modal show={showing} >
                <Modal.Body>

                    <div className="accordion-item" id="accordionFlushExample">

                        <div className="accordion-body">
                            <p> Please wait as we set up your Datatrunk Instance</p>
                            <CirclesWithBar
                                color="red"
                                outerCircleColor="purple"
                                innerCircleColor="purple"
                                barColor="purple"
                            />

                        </div>

                    </div>

                </Modal.Body>
            </Modal>






            <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
                <div className="accordion accordion-flush" id="accordionFlushExample" style={{ maxWidth: '600px', width: '600px' }}>
                    <Card.Header>Create Datatrunk Workspace</Card.Header>
                    <Card.Body>
                        <Form onSubmit={submitWorkspace}>
                            <Form.Group className="mb-3">
                                <Form.Label>Workspace Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Workspace Name" name="Workspace Name" value={Workspace_Name} required onChange={(e) => { setWorkspaceName(e.target.value); }} />
                                <Form.Control.Feedback type="invalid">Workspace name is required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Work Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Workspace Description" name="Workspace Description" required value={Workspace_Description} onChange={(e) => { setWorkspaceDescription(e.target.value); }} />
                                <Form.Control.Feedback type="invalid">Workspace Description is required</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" size="sm" type="submit">Add Workspace</Button>
                        </Form>
                    </Card.Body>
                </div>
            </Card>
            {" "}
            <Card id='Tips_Card' className="border-ndovu rounded-0 my-3" style={{ margin: '0 0 0 40px', float: 'right', alignItems: 'center' }}>
                <div>
                    <Card.Title style={{ textTransform: 'capitalize' ,alignItems: 'center'}}>TIPS</Card.Title>
                  
                        <Alert severity="info">
                            <AlertTitle>

                                <p><b>Workspace Name</b>  The name of your department or the kind of data you are trying to analyze</p>
                                <br/>
                                <p><b>Workspace Description</b>  Describe the department or data you chose In memorable words.</p>
                            </AlertTitle>
                        </Alert>
                   

                </div>


            </Card>

        </>
    );
};

export default AddWorkspace;
