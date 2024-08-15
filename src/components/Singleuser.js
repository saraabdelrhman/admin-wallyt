import React from 'react';
import {  Container, Row, Col } from 'react-bootstrap';

const Singleuser = () => {
  const userDetails = {
    id: '0005',
    email: 'sara@gmail.com',
    name: 'Sara',
    photo: 'https://via.placeholder.com/50',
    bio: 'I love coding and developing new applications.',
    status: 'Single',
    createdAt: '2024',
  };

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row className="align-items-center mb-4 w-100">
        <Col className="text-center">
          <h2 className="">User Details</h2>
        </Col>
      </Row>
      <Row className="mb-3 w-50">
        <Col>
        </Col>
      </Row>
      <Row className="w-50 text-center">
        <Col>
          <div className="mb-4">
            <img src={userDetails.photo} alt="User" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
          </div>
          <div className="mb-3 h5">
            <strong>ID:</strong> {userDetails.id}
          </div>
          <div className="mb-3 h5">
            <strong>Name:</strong> {userDetails.name}
          </div>
          <div className="mb-3 h5">
            <strong>Email:</strong> {userDetails.email}
          </div>
          <div className="mb-3 h5">
            <strong>Bio:</strong> {userDetails.bio}
          </div>
          <div className="mb-3 h5">
            <strong>Status:</strong> {userDetails.status}
          </div>
          <div className="mb-3 h5">
            <strong>Created At:</strong> {userDetails.createdAt}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Singleuser;
