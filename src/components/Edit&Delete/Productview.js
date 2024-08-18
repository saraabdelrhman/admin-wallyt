import React from 'react';
import { Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Product Details</h2>
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> 0003</p>
        <p><strong>Name:</strong> Laptopb</p>
        <p><strong>Category ID:</strong> 5525</p>
        <p><strong>Brand:</strong> Apple</p>
        <p><strong>Description:</strong> For learning</p>
        <div className="d-flex flex-column align-items-center">
          <strong>Image:</strong>
          <img src="https://via.placeholder.com/50" alt="Product" className="rounded-circle mt-2" />
        </div>
      </div>
    </Container>
  );
};

export default Products;
