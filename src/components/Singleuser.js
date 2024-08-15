import React from 'react';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Singleuser = () => {
  const userDetails = {
    id: '0005',
    email: 'sara@gmail.com',
    password: 'utb873t73rut',
    name: 'Sara',
    photo: 'https://via.placeholder.com/50',
    bio: 'I love coding and developing new applications.',
    status: 'Single',
    createdAt: '2024',
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">User Details</h2>
        </Col>
        <Col md={6} className="text-md-end">
          <Button variant="warning" size="md">+ Add New User</Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search users by name or email"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button variant="outline-primary" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <strong>ID:</strong> {userDetails.id} &nbsp;|&nbsp;
            <strong>Email:</strong> {userDetails.email} &nbsp;|&nbsp;
            <strong>Password:</strong> {userDetails.password} &nbsp;|&nbsp;
            <strong>Name:</strong> {userDetails.name} &nbsp;|&nbsp;
            <strong>Photo:</strong> 
            <img src={userDetails.photo} alt="User" className="rounded-circle ms-2" style={{ width: '30px', height: '30px' }} /> &nbsp;|&nbsp;
            <strong>Bio:</strong> {userDetails.bio} &nbsp;|&nbsp;
            <strong>Status:</strong> {userDetails.status} &nbsp;|&nbsp;
            <strong>Created At:</strong> {userDetails.createdAt}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Singleuser;

