import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Newuser = () => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    email: '',
    name: '',
    photo: null, // Changed to null to hold the file object
    bio: '',
    status: '',
    createdAt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setUserDetails({ ...userDetails, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', userDetails.id);
    formData.append('email', userDetails.email);
    formData.append('name', userDetails.name);
    formData.append('photo', userDetails.photo);
    formData.append('bio', userDetails.bio);
    formData.append('status', userDetails.status);
    formData.append('createdAt', userDetails.createdAt);

    // You would typically send `formData` to your server here
    console.log('User details submitted:', userDetails);
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">Add New User</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserID" className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user ID"
                name="id"
                value={userDetails.id}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserPhoto" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formUserBio" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter user bio"
                name="bio"
                value={userDetails.bio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user status"
                name="status"
                value={userDetails.status}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserCreatedAt" className="mb-3">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter created date"
                name="createdAt"
                value={userDetails.createdAt}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="warning"  type="submit">
          Add User
        </Button>
      </Form>
    </Container>
  );
};

export default Newuser;
