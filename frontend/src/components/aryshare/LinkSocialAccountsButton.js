
import React, { useEffect} from "react";
import { Button, Card, Form } from "react-bootstrap";

import '../sidebar.css';

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CREATEPROFILEURL = '/aryshare/createProfile';


const LinkSocialAccountsButton = () => {
  
  
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    window.scrollTo(0, 0);

  }, [])

  const handleSocialsLinking = async (e) => {
    e.preventDefault();
    try {
      

      // Wait for the get request to resolve
      const response = await axiosPrivate.get(CREATEPROFILEURL);
      // Set the userID variable using the response data

        alert(response);

     
    } catch (error) {
      if (!error.response) {
        alert('No server response');
      } else {
        alert('Scheduling failed');
      }
    }
  };






  return (
    <>
    

  

      <Card className="border-ndovu rounded-0 my-3" style={{ maxWidth: '900px', width: '100%' }}>
        <Card.Header>Link your Channels</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSocialsLinking}>

            <Button variant="primary" size="sm" type="submit" id='share' >Link Social Accounts</Button>{" "}
          </Form>



        </Card.Body>
      </Card>

    </>
  );
};

export default LinkSocialAccountsButton;
