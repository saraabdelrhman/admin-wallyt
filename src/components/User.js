import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'Admin'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://wallyt.com/profile'); 
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfile(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    setTimeout(fetchProfile, 2000);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/profile/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }
        alert('Profile deleted successfully!');
        setProfile(null); // Optionally clear the profile data
      } catch (error) {
        alert(`Error deleting profile: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">Profile Management</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search by name or email"
              aria-label="Search"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Table responsive="md" striped bordered hover className="user-table">
        <thead className="bg-light">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{loading ? 'Loading...' : profile ? profile.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : profile ? profile.email : 'N/A'}</td>
            <td>{loading ? 'Loading...' : profile ? profile.name : 'N/A'}</td>
            <td>{loading ? 'Loading...' : profile ? profile.role : 'N/A'}</td>
            <td>
              <Link to={'/singleuser'}>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !profile}>
                  <FaEye title="View Profile" />
                </Button>
              </Link>
              <Link to={'/useredit'}>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !profile}>
                  <FaEdit title="Edit Profile" />
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light" 
                onClick={() => profile && handleDelete(profile.id)}
                disabled={loading || !profile}
              >
                <FaTrash title="Delete Profile" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Profile;
