import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Added FaSearch
import { Link } from 'react-router-dom';

const Review = () => { // Capitalized component name
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Review Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button variant="outline-warning" id="button-addon2">
              <FaSearch /> {/* Replaced with FaSearch icon for consistency */}
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end">
       <Link to='/newreview'>   <Button variant="warning" size="md">+ Add New Review</Button> </Link>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Product Id</th>
            <th>User Id</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0003</td>
            <td>255</td>
            <td>189</td>
            <td>4</td>
            <td>
              <Link to='/reviewview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                  <FaEye />
                </Button>
              </Link>
              <Link to='/reviewedit'>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                  <FaEdit />
                </Button>
              </Link>
              <Button size="sm" className="me-2 mb-1 text-danger" variant="light">
                <FaTrash />
              </Button>
            </td>
          </tr>
          {/* Additional rows would be dynamically generated here */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Review; // Capitalized component name
