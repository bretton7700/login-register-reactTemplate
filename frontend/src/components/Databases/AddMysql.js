import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useNavigate, } from 'react-router-dom';
import '../sidebar.css';

const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)

const UniqueDB_URL = '/databases/unique';
const CreateDB_URL = '/databases/create';


const AddMysql = () => {
    const axiosPrivate = useAxiosPrivate();

    
    const [showing, setShowing] = useState(false);
    const handleShowing = () => setShowing(true);
    const handleClosing = () => setShowing(false);
    const navigate = useNavigate();

    const [databaseName, setdatabaseName] = useState('')
    const [rootPassword, setrootPassword] = useState('')
    const [databaseList, setdatabaseList] = useState([])
    

    useEffect(() => {
        window.scrollTo(0,0);
        
    }, [])

    
    const submitDatabase = async (e) => {
        e.preventDefault();
    
        if (databaseName.length === 0 || rootPassword.length === 0) {
            alert('please fill in the details');
            return;
        }
        try {
            const { data } = await axiosPrivate.get(UniqueDB_URL, { params: { Database_Name: databaseName } });
            if (data.length === 0) {
                axiosPrivate.post(CreateDB_URL, {
                    databaseName: databaseName,
                    rootPassword: rootPassword,
                    Admin_Email: userEmail
                });
                setdatabaseList([...databaseList, {
                    databaseName: databaseName,
                    rootPassword: rootPassword,
                    Admin_Email: userEmail
                }]);
                setdatabaseName('');
                setrootPassword('');
    
                handleShowing();
                setTimeout(() => {
                    handleClosing();
                    navigate('/datatrunk', { replace: true });
                }, 1000);
    
            } else {
                alert('you cannot have a database with a similar name')
                setdatabaseName('')
                setrootPassword('')
            }
        } catch (error) {
            console.log(error);
        }
    }
    


    return (
        <>
            <div>
                <Modal show={showing} >
                    <Modal.Body>

                        <div className="accordion-item" id="accordionFlushExample">

                            <div className="accordion-body">
                                <Card.Title> You have successfully Created a Mysql Database <br/> Ensure You store your Password as it won't be Provided</Card.Title>

                            </div>

                        </div>

                    </Modal.Body>
                </Modal>
            </div>

            <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
                <Card.Header>Database Creation</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitDatabase}>

                        <Row>
                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Database  Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the name of the database " name="databasename" value={databaseName} required onChange={(e) => { setdatabaseName(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">database name  is  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>

                            <Col sm={6}>

                                <Form.Group className="mb-3">
                                    <Form.Label>Root Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter the root password of your database" name="rootPassword" value={rootPassword} required onChange={(e) => { setrootPassword(e.target.value); }} />
                                    <Form.Control.Feedback type="invalid">root password  required</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button variant="primary" size="sm" type="submit" id='yenu' >Create Database</Button>{" "}
                    </Form>



                </Card.Body>
            </Card>

        </>
    );
};

export default AddMysql;
