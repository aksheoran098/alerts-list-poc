import React from 'react'
import { Container, Navbar } from 'react-bootstrap';

const TopBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light" sticky='top'>
        <Container>
            <Navbar.Brand style={{ fontWeight: "800", lineHeight: "3rem" }}>Honeycomb for
            PRP application</Navbar.Brand>
        </Container>
    </Navbar>
  )
}

export default TopBar;