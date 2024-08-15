import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import {  FaSearch } from 'react-icons/fa';

const comment = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2"> Comment  Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
        <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button variant="outline-primary" id="button-addon2">
            <FaSearch /> {/* Consistent icon usage */}
            <i className="bi bi-search"></i> 
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end">
          <Button className='btn btn-warning' size="md">+ Add New Product</Button>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review Id</th>
            <th>User Id</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
       
      
          <tr>
            <td>0003</td>
            <td>233</td>
            <td>787</td>
            <td>Not bad</td>
            <td>2024</td>
          </tr>
          {/* Additional rows would be dynamically generated here */}
        </tbody>
      </Table>
    </Container>
  );
};

export default comment;
