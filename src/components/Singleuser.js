import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Singleuser = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({
    id: '',
    name: '',
    email: '',
    bio: '',
    status: '',
    createdAt: '',
    photo: 'https://via.placeholder.com/100',  // Default placeholder image
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://wallyt.com/profile/${userId}`); // Dynamic URL based on userId
        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }
        const data = await response.json();
        setUserDetails({
          ...data,
          photo: data.photo || 'https://via.placeholder.com/100'  // Use fetched photo or placeholder
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message);

        // Set fallback fake data
        setUserDetails({
          id: '0000',
          name: 'John Doe',
          email: 'johndoe@example.com',
          bio: 'This is a fallback bio. Failed to fetch the actual data.',
          status: 'Unknown',
          createdAt: '1970-01-01',
          photo: 'https://via.placeholder.com/100',
        });

        setLoading(false); // Stop loading even if there is an error
      }
    };

    fetchUserData();
  }, [userId]);  // Dependency array includes userId to refetch when it changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <Row className="align-items-center mb-4 w-100">
        <Col className="text-center">
          <h2>User Details</h2>
          {error && <div className="text-danger">Error: {error}. Showing fallback data.</div>}
        </Col>
      </Row>
      <Row className="mb-3 w-50 justify-content-center">
        <Col className="text-center">
          <img
            src={userDetails.photo}
            alt="User"
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
      </Row>
      <Row className="w-50 text-center">
        <Col>
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
