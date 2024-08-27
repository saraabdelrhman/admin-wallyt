import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const UserEdit = () => {
  // State to hold the form data
  const [userData, setUserData] = useState({
    id: '0001',
    email: 'sara@gmail.com',
    name: 'Sara',
    photo: '',
    bio: 'I love coding and developing new applications.',
    status: 'Single',
    createdAt: '2024',
    permission: '', // Single permission instead of multiple
  });

  const availablePermissions = [
    'Ceo',
    'Business Developer',
    'Full stack',
    'Web Designer',
    'Admin',
  ];

  // Handle permission change
  const handlePermissionChange = (e) => {
    setUserData({ ...userData, permission: e.target.value });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle file input change for photo
  const handlePhotoChange = (e) => {
    setUserData({
      ...userData,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  // Handle save button
  const handleSave = () => {
    // You can add code here to save the data to the backend
    console.log('Saved data:', userData);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="fw-bold mb-4">Edit User</h2>
      <Form>
        {/* ID and Email */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={userData.id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Name and Status */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={userData.status}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Photo and Created At */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserPhoto">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {userData.photo && (
                <img
                  src={userData.photo}
                  alt="User"
                  className="rounded-circle mt-2"
                  style={{ width: '100px', height: '100px' }}
                />
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formUserCreatedAt">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="text"
                name="createdAt"
                value={userData.createdAt}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Bio */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formUserBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Permissions Dropdown */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formUserPermissions">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={userData.permission}
                onChange={handlePermissionChange}
              >
                <option value="">Select Role</option>
                {availablePermissions.map((permission, index) => (
                  <option key={index} value={permission}>
                    {permission}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="warning" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default UserEdit;
