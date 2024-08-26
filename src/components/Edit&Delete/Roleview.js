import React from 'react';
import { Container } from 'react-bootstrap';

const Role = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Category Details</h2>
      <div className="d-flex flex-column align-items-center">
        <p><strong>Role:</strong> Web designer</p>
        <p><strong>Permessions:</strong> Doing the design of the website</p>
      </div>
    </Container>
  );
};

export default Role;
