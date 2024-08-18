import React from 'react';
import { Container } from 'react-bootstrap';

const Category = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Category Details</h2>
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> 0003</p>
        <p><strong>Name:</strong> Phone</p>
        <p><strong>Parent Category ID:</strong> 22</p>
      </div>
    </Container>
  );
};

export default Category;
