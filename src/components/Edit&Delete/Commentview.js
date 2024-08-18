import React from 'react';
import { Container } from 'react-bootstrap';

const Comment = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Comment Moderation</h2>
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> 0003</p>
        <p><strong>Review ID:</strong> 233</p>
        <p><strong>User ID:</strong> 787</p>
        <p><strong>Comment:</strong> Not bad</p>
        <p><strong>Created At:</strong> 2024</p>
      </div>
    </Container>
  );
};

export default Comment;
