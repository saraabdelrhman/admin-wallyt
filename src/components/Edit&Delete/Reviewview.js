import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const review = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2"> Review  Moderation</h2>
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
            <th>Product Id</th>
            <th>User Id</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Created-At</th>
          </tr>
        </thead>
        <tbody>
       
          <tr>
            <td>0003</td>
            <td>255</td>
            <td>189</td>
            <td>4</td>
            <td>Good</td>
            <td>2024</td>
           
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default review;
