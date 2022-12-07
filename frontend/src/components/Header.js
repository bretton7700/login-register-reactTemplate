import { Avatar } from '@mui/material';
import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
      await logout();
      navigate('/login');
  }
  
  return (
    <>


      <Navbar collapseOnSelect expand="lg" className="bg-ndovu" variant="dark">
        <Navbar.Brand href="#home">Ndovucloud Workspaces</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
  

            
          </Nav>
          <Nav>
            <Avatar src='https://img.icons8.com/color/48/000000/name--v1.png' />
            <NavDropdown className="ml-auto" style={{minWidth: '5rem', padding: ".25rem .25rem"}} title="welcome">
            
            
 
            <NavDropdown.Item href="https://ndovucloud.com/blog">Blog</NavDropdown.Item>
              <NavDropdown.Item href="https://documentation.ndovucloud.com">Documentation</NavDropdown.Item>
              <NavDropdown.Item href="https://ndovucloud.com/contact/">Contact Us</NavDropdown.Item>
             
              <Button variant='light' onClick={signOut} >Logout</Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};







