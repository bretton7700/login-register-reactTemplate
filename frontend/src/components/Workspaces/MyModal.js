import Axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Modal, Table } from "react-bootstrap";

const MyModal = ({ Current_Workspace_Name }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  const [Member_Name, setMemberName] = useState('');
  const [Member_Email, setMemberEmail] = useState('');
  const [MemberList, setMemberList] = useState([])
  const Admin_Email = global.mail;
  const Current_User_Email = global.mail;
  const [company_Name, setcompanyName] = useState('');
 
  const suitName = 'datatrunk';

  const [showing, setShowing3] = useState(false);
  const handleShowing = () => setShowing3(true);
  const handleClosing = () => setShowing3(false);


  const [shown, setShowing4] = useState(false);
  const handleShown = () => setShowing4(true);
  const handleClos = () => setShowing4(false);

  useEffect(() => {
    Axios.get("https://backend.droplets.ndovucloud.com/api/getcompanyNameforUser",

      {
        params: {
          Users_Email: Current_User_Email,
        }
      }



    ).then((response) => {
      const data = response.data;
      

      global.User_Company = data.map(({ userCompany }) => userCompany);

      
      setcompanyName(global.User_Company[0]);

    })



    /////////////////////////////////
    Axios.get("https://backend.droplets.ndovucloud.com/api/getMembers"

      , {
        params: {
          logged_In_Email: Admin_Email,
          product_Picked: suitName,
        }
      }

    )
      .then((response) => {
        setMemberList(response.data);
      })
  }, [company_Name,Admin_Email, suitName])


  const deleteMember = (Member) => {
    Axios.delete(`https://backend.droplets.ndovucloud.com/api/deleteMembers/${Member}`);
    const newMembers = MemberList.filter((member) => member.Member_Name !== Member);
    setMemberList(newMembers);

    handleShown();
    setTimeout(function () {

      handleClos();

    }, 1000);
  }


  const submitMember = (event) => {
    event.preventDefault();

    if (Member_Name.length === 0 | Member_Email.length === 0) {
      console.log('please fill in the details');
    } else {
      Axios.get("https://backend.droplets.ndovucloud.com/api/getUsers",
        {
          params: {
            Workspace_Name: Current_Workspace_Name,

          },
        }).then((response) => {
          const data = response.data;
          

         //The number of users already invited
          const No_of_Users_Already_Invited = data.map(({ users }) => users);
         
          const number = No_of_Users_Already_Invited[0]


          
          
          const members = MemberList.length
          //If statement to check if the invites have been exhausted

          if (number === members | members > number) {
            alert('you have exhausted your invites')
            setMemberName('')
            setMemberEmail('')
          } else {
            Axios.post("https://backend.droplets.ndovucloud.com/api/insertMembers",
              {
                Member_Name: Member_Name,
                Member_Email: Member_Email,
                Admin_Email: Admin_Email,
                company_Name: company_Name,
                suitName: suitName
              });

            setMemberList([
              ...MemberList,
              { Member_Name: Member_Name, Member_Email: Member_Email, Admin_Email: Admin_Email, company_Name: company_Name, suitName: suitName }
            ])
            setMemberName('')
            setMemberEmail('')

            handleShowing();
            setTimeout(function () {

              handleClosing();

            }, 1000);

          }

        })


    }


  }


  return (
    <>
      <Modal show={showing} >
        <Modal.Body>

          <div className="accordion-item" id="accordionFlushExample">

            <div className="accordion-body">
              <Card.Title> You have successfully invited a new  member</Card.Title>

            </div>

          </div>

        </Modal.Body>
      </Modal>


      <Modal show={shown} >
        <Modal.Body>

          <div className="accordion-item" id="accordionFlushExample">

            <div className="accordion-body">
              <Card.Title> You have successfully deleted </Card.Title>

            </div>

          </div>

        </Modal.Body>
      </Modal>


      <Button className='mr-2' variant="primary" size='sm' onClick={handleShow}>Invite Members</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Invite Members</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control type="text" name="Member Name" placeholder="Enter Member Name" required value={Member_Name} onChange={(e) => { setMemberName(e.target.value); }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Member Email</Form.Label>
              <Form.Control type="email" name="Member Email" placeholder="Enter Member Email" required value={Member_Email} onChange={(e) => { setMemberEmail(e.target.value); }} />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" onClick={submitMember} block>Add Member</Button>
          </Form>
        </Modal.Body>
        <Modal.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Member Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <>
                {MemberList.map((val, index) => {
                  return <tr key={index}> <td>{val.Member_Name}</td>
                    <td>{val.Member_Email}</td>
                    <td><button type='button' className='btn btn-sm btn-danger' onClick={() => { deleteMember(val.Member_Name) }} >delete</button> </td>
                  </tr>
                })}
              </>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' class='btn btn-sm btn-danger' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MyModal
