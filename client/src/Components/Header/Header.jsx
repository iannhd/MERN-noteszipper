import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom'
import {DropdownButton} from 'react-bootstrap'

const Header = () => {
  return (
    <>
    <Navbar bg="primary" expand="lg" variant="dark" className='px-5'>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Note Zipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
            
        <Nav
            className="m-auto"
            style={{ maxHeight: '100px' }}
            navbarScroll
        >
            <Form className="">
            <Form.Control
            type="search"
            placeholder="Search"
            className="m-auto"
            aria-label="Search"
            />
            </Form>
            
        </Nav>
        <Nav>
            <Nav.Link>
              <Link to='/mynotes'>
                My Notes
              </Link>
            </Nav.Link>
            <NavDropdown
            align="end"
            title="Username"
            id="dropdown-menu-align-end"
            >
            <NavDropdown.Item href="#action3">
              My Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Logout
            </NavDropdown.Item>
            </NavDropdown>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header