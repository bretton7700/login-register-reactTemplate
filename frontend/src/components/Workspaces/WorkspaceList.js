import { Alert, AlertTitle } from "@mui/material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import Delete from "./Delete";
import MyModal from "./MyModal";
import PalModal from "./PalModal";
import '../WorkspaceList.css';
import DeleteDatabase from "./DeleteDatabase";
import PayDatabase from "./PayDatabase";
const userEmail = localStorage.getItem('userEmail');
console.log(userEmail)

const userCompany = localStorage.getItem('company');
console.log(userCompany)

const GetWorkspaces_URL = '/users/allCompanyWorkspaces';
const DatabasePaymentStatus_URL = '/users/DatabasePaymentStatus';
const GetDatabases_URL = '/users/GetDatabases';

const UpdateWorkspace_URL = '/users/UpdateWorkspace';

const WorkspaceList = () => {
  const axiosPrivate = useAxiosPrivate();


  const [WorkspaceList, setWorkspaceList] = useState([])

  const suitName = 'datatrunk'
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState("")

  //Databases List
  const [databaseList, setdatabaseList] = useState([])

  const [shower, setShowing] = useState(false);
  const [Trial_Databases_List, setTrialDatabaseList] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workspaces
        const workspaceResponse = await axiosPrivate.get(`${GetWorkspaces_URL}/${userCompany}/${suitName}`, {
          params: {
            company: userCompany,
            product: suitName,
          },
        });
        setWorkspaceList(workspaceResponse.data);

        // Fetch databases
        const databaseResponse = await axiosPrivate.get(DatabasePaymentStatus_URL);
        const data = databaseResponse.data;
       setTrialDatabaseList( data.map(({ databaseName }) => databaseName));

        const userDatabasesResponse = await axiosPrivate.get(`${GetDatabases_URL}/${userEmail}`, {
          params: {
            Users_Email: userEmail,
          }
        });
        setdatabaseList(userDatabasesResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const updateWorkspace = async (Workspace) => {
    if (!newWorkspaceDescription) {
      alert('Please enter a description');
      return;
    }

    try {
      await axiosPrivate.put(UpdateWorkspace_URL, {
        Workspace_Name: Workspace,
        Workspace_Description: newWorkspaceDescription,
      });
      setNewWorkspaceDescription("");
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <>

      <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>      <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
        <div className="accordion accordion-flush" id="accordionFlushExample" style={{ maxWidth: '600px', width: '600px' }}>
          {WorkspaceList.map((val, index) => {
            //BGN 4/11/2022 TRIAL_CREATEDDATE CHANGES TO TODAYS DATE EVERYDAY
            const Trial_CreatedDate = val.workspaceTrialBeginning
            const dayItExpires = val.expiryDate

            const date1 = new Date(Trial_CreatedDate);
            const date2 = new Date(dayItExpires);
            const diffTime = Math.abs(date2 - date1);

            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            global.Days_Both_PaidAnd_Trial = 0
            if (diffDays === 0) {
              const Period_Paid = val.timePaid
              const Total_Days_Paid = (30 * Period_Paid)
              global.Days_Both_PaidAnd_Trial = Total_Days_Paid

            } else {
              global.Days_Both_PaidAnd_Trial = diffDays
              //   if (diffDays === 2) {
              //     axiosPrivate.post("https://backend.droplets.ndovucloud.com/api/TrialExpiry", {
              //       WorkspaceOwnerEmail: val.workspaceEmail,

              //     });
              //   }
            }

            return (
              <div className="accordion-item" id="accordionFlushExample" key={index}>
                <h2 className="accordion-header">
                  <button style={{ textTransform: 'capitalize' }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-" + index} aria-expanded="false" aria-controls={"flush-" + index} >
                    {val.workspaceName} {" "} <div style={{ width: '600px', textAlign: "right" }}>Click Here to begin</div>
                  </button>
                </h2>
                <div id={"flush-" + index} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                  <div className="accordion-body">

                    <Card.Title style={{ textTransform: 'capitalize' }}>{val.status} Status  </Card.Title>
                    <Alert severity="info">
                      <AlertTitle>{val.status} Expires In {global.Days_Both_PaidAnd_Trial} , Days</AlertTitle>

                    </Alert>


                    <Card.Title style={{ textTransform: 'capitalize' }}>Name: {val.Workspace_Name}</Card.Title>
                    <Card.Text style={{ textTransform: 'capitalize' }}>Description: {val.Workspace_Description}</Card.Text>
                    <Card.Link href={val.workspaceLink}>
                      <Alert severity="info">
                        <AlertTitle>Start {val.status}</AlertTitle>

                      </Alert>
                    </Card.Link>

                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label>Workspace Description</Form.Label>
                        <Form.Control placeholder="Enter New Description" type="text" required value={newWorkspaceDescription} onChange={(e) => { setNewWorkspaceDescription(e.target.value); }} />
                        <Form.Control.Feedback type="invalid">New workspace description is required</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Workspace Description is required</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group>
                        <Button className='mr-2' variant="warning" size='sm' onClick={() => { updateWorkspace(val.Workspace_Name) }}>Update</Button>
                        <MyModal Current_Workspace_Name={val.workspaceName} />
                        <PalModal Current_Workspace_Name={val.workspaceName} />
                        <Delete Current_Workspace_Name={val.workspaceName} />

                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </Card>
        <Card className="border-ndovu rounded-0 my-3" style={{ float: 'left', alignItems: 'center' }}>
          <div className="accordion accordion-flush" id="accordionFlushExample" style={{ maxWidth: '600px', width: '600px' }}>
            {databaseList.map((val, index) => {
              // Define default properties on the val object
              val.uri = `mysql://root:yourpass@164.92.77.118:${val.port}/${val.databaseName}`;
              val.databaseType = 'Please Pay ';
              val.username = 'Please Pay';
              val.password = 'Please Pay';
              val.Ip = 'Please Pay';
              val.port = 'Please Pay';
              val.dbName = 'Please Pay';
              val.payButton = 'Pay Mysql';

              // Check if database is in the trial list
              if (Trial_Databases_List.indexOf(val.databaseName) !== -1) {
                console.log("Value exists oeeeh!")
                val.uri = 'please pay';
                val.databaseType = 'please payonly $15';
                val.username = 'please pay ';
                val.password = 'please pay ';
                val.Ip = 'please pay  ';
                val.port = 'please pay ';
                val.dbName = 'please pay';
                val.payButton = 'Pay Mysql';
              } else {
                val.uri = `mysql://root:Yourpass@164.92.77.118:${val.port}/${val.databaseName}`
                val.databaseType = 'mysql';
                val.username  = 'root';
                val.password = `yourpass`;
                val.Ip = '164.92.77.118';
                val.port = `${val.port}`;
                val.dbName = `${val.databaseName}`;
                val.payButton = 'Upgrade Mysql';
              }

              return (
                <div className="accordion-item" id="accordionFlushExample" key={index}>
                  <h2 className="accordion-header">
                    <button style={{ textTransform: 'capitalize' }} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-" + index} aria-expanded="false" aria-controls={"flush-" + index} >
                      {val.databaseName} {" "} <div style={{ width: '600px', textAlign: "right" }}>Click Here to Access</div>
                    </button>
                  </h2>
                  <div id={"flush-" + index} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">
                      <div style={{ padding: '1px 4px 10px 1px ' }}>
                        <Card.Title >Database Name:</Card.Title>
                        <Card.Title >{val.databaseName}</Card.Title>
                        <Card.Text >Root User:</Card.Text>
                        <Card.Text >{global.username} </Card.Text>

                        <Alert severity="info">
                          <AlertTitle>
                            <p>Database Type:</p>

                            <p>{val.databaseType}</p>

                            <p>Username:</p>
                            <p> {val.username}</p>


                            <p>Password:</p>
                            <p> your password</p>


                            <p>Ip:</p>
                            <p> {val.Ip}</p>


                            <p>Port:</p>
                            <p> {val.port}</p>


                            <p>Database Name:</p>
                            <p> {val.dbName}</p>

                            <p>URI:</p>
                            <p>{val.uri}</p>
                            <br />

                          </AlertTitle>

                        </Alert>

                      </div>
                      <Form>

                        <Form.Group>
                          <Button onClick={() => {
                            setShowing(true);
                          }}>{val.payButton}</Button>
                          {shower ? <PayDatabase Current_Workspace_Name={val.databaseName}> </PayDatabase> : <p>:</p>} {" "}
                          <DeleteDatabase Current_Workspace_Name={val.databaseName} />
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

      </Card>


      {" "}
      <Card id='videos_Card' className="border-ndovu rounded-0 my-3" style={{ margin: '0 0 0 40px', float: 'right', alignItems: 'center' }}>
        <div >
          <Col>

            <Col style={{ padding: '1px 4px 2px 2px ' }} sm={4}>
              <div style={{ width: '300%', height: '100%' }}>
                <ReactPlayer height="720" width="300" url='https://youtu.be/iGgmclB-Sf4' />
              </div>

            </Col>

            <Col style={{ padding: '1px 4px 2px 1px ' }} sm={4}>
              <div style={{ width: '300%', height: '100%' }}>
                <ReactPlayer height="720" width="300" url='https://youtu.be/_a0jlVVxpx8' />
              </div>
            </Col>

            <Col style={{ padding: '1px 4px 2px 2px ' }} sm={4}>
              <div style={{ width: '300%', height: '100%' }}>
                <ReactPlayer height="720" width="300" url='https://youtu.be/ki_j_nhTRXs' />
              </div>

            </Col>


          </Col>
        </div>


      </Card>
    </>
  );
};

export default WorkspaceList;
