import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Singleuser = () => {
  // Initialize with mock data
  const [userDetails, setUserDetails] = useState({
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bio: "Developer at Tech Co.",
    status: "Active",
    createdAt: "2022-01-01",
    photo: "https://via.placeholder.com/100",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://wallyt.com/profile/1");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const data = await response.json();
        setUserDetails(data); // Update with actual data
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    setTimeout(fetchUserData, 2000); 
  }, []);

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center vh-100"
    >
      <Row className="align-items-center mb-4 w-100">
        <Col className="text-center">
          <h2>User Details</h2>
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
