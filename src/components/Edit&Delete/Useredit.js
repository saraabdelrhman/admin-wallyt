import React, { useState } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEdit, FaSearch, FaSave } from 'react-icons/fa';

const Useredit = () => {
  // State to hold the form data
  const [userData, setUserData] = useState({
    id: '0001',
    email: 'sara@gmail.com',
    password: 'utb873t73rut',
    name: 'Sara',
    photo: 'https://via.placeholder.com/50',
    bio: 'I love coding and developing new applications.',
    status: 'Single',
    createdAt: '2024',
  });

  // State to toggle edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle save button
  const handleSave = () => {
    setIsEditing(false);
    // You can add code here to save the data to the backend
    console.log('Saved data:', userData);
  };

  return (
    <Container fluid className="p-4">
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
      <Table responsive="md" striped bordered hover className="user-table">
        <thead className="bg-light">
          <tr>
            <th><input type="checkbox" /></th>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Bio</th>
            <th>Status</th>
            <th>Created-At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>{userData.id}</td>
            <td>
              {isEditing ? (
                <FormControl
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              ) : (
                userData.email
              )}
            </td>
            <td>
              {isEditing ? (
                <FormControl
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              ) : (
                userData.password
              )}
            </td>
            <td>
              {isEditing ? (
                <FormControl
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              ) : (
                userData.name
              )}
            </td>
            <td>
              <img src={userData.photo} alt="User" className="rounded-circle" />
            </td>
            <td>
              {isEditing ? (
                <FormControl
                  as="textarea"
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                />
              ) : (
                userData.bio
              )}
            </td>
            <td>
              {isEditing ? (
                <FormControl
                  name="status"
                  value={userData.status}
                  onChange={handleInputChange}
                />
              ) : (
                userData.status
              )}
            </td>
            <td>{userData.createdAt}</td>
            <td>
              {isEditing ? (
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" onClick={handleSave}>
                  <FaSave />
                </Button>
              ) : (
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" onClick={() => setIsEditing(true)}>
                  <FaEdit />
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Useredit;
