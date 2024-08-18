import React from 'react';
import { Container } from 'react-bootstrap';

const ReportView = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Report Moderation</h2>
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> 0002</p>
        <p><strong>Review ID:</strong> 8065</p>
        <p><strong>User ID:</strong> 654</p>
        <p><strong>Report:</strong> Problem</p>
        <p><strong>Status:</strong> Good</p>
        <p><strong>Created At:</strong> 2024</p>
      </div>
    </Container>
  );
};

export default ReportView;
