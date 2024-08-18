import React from 'react';
import { Button, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const Review = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Review Moderation</h2>
      
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> 0003</p>
        <p><strong>Product ID:</strong> 255</p>
        <p><strong>User ID:</strong> 189</p>
        <p><strong>Rating:</strong> 4</p>
        <p><strong>Reviews:</strong> Good</p>
        <p><strong>Created At:</strong> 2024</p>
      </div>
    </Container>
  );
};

export default Review;
 