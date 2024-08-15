import React from 'react';
import {  Table, Container } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2"> Product Management</h2>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category Id</th>
            <th>Brand</th>
            <th>Description</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>0003</td>
            <td>Laptopb</td>
            <td>5525</td>
            <td>Apple</td>
            <td>For learning</td>
            <td><img src="https://via.placeholder.com/50" alt="User" className="rounded-circle" /></td>
          </tr>
          {/* Additional rows would be dynamically generated here */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
