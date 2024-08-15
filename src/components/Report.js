import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Replaced with FaSearch
import { Link } from 'react-router-dom';

const Report = () => { // Capitalized component name
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Report Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search reports by review or user"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
             <Button variant="outline-primary" id="button-addon2">
              <FaSearch /> {/* Consistent icon usage */}
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end">
          {/* Remove irrelevant button or replace with something relevant */}
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review Id</th>
            <th>User Id</th>
            <th>Report</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0002</td>
            <td>8065</td>
            <td>654</td>
            <td>Problem</td>
            <td>
              <Link to='/reportview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                  <FaEye />
                </Button>
              </Link>
              <Link to='/reportedit'>
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

export default Report; // Capitalized component name
