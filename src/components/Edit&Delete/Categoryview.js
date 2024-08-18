import React from 'react';
import {  Table,  Container } from 'react-bootstrap';

const Category = () => {
  return (
    <Container fluid className="mt-4">
    <h2 className="fw-bold pb-2"> Category Management</h2>
   
    <Table responsive="md" striped bordered hover className="product-table">
      <thead className="bg-dark text-white">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Parent_category_id</th>
        </tr>
      </thead>
      <tbody>
       
        <tr>
          <td>0003</td>
          <td>Phone</td>
          <td>22</td>
         
        </tr>
        {/* Additional rows would be dynamically generated here */}
      </tbody>
    </Table>
  </Container>

  );
};

export default Category;

