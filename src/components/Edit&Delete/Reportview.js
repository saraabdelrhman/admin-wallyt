import React from 'react';
import {  Table,  Container, Row, Col } from 'react-bootstrap';

const reportview = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2"> Report  Moderation</h2>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review Id</th>
            <th>User Id</th>
            <th>Report</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td>0002</td>
            <td>8065</td>
            <td>654</td>
            <td>Problem</td>
            <td>Good</td>
            <td>2024</td>
          </tr>
          
          {/* Additional rows would be dynamically generated here */}
        </tbody>
      </Table>
    </Container>
  );
};

export default reportview;
