import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Import the icons
import { Link } from 'react-router-dom';

const UserTable = () => {
  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">User Management</h2>
        </Col>
        <Col md={6} className="text-md-end">
          <Button variant="warning" size="md">+ Add New User</Button>
        </Col>
      </Row>
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
      </Row>
      <Table responsive="md" striped bordered hover className="user-table">
        <thead className="bg-light">
          <tr>
            <th><input type="checkbox" /></th>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td>0001</td>
            <td>sara@gmail.com</td>
            <td>Sara</td>
            <td>
              <Link to="/singleuser">
                <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                  <FaEye />
                </Button>
              </Link>
              <Link to="/Useredit">
                <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                  <FaEdit />
                </Button>
              </Link>
              <Button size="sm" className="me-2 mb-1 text-danger" variant="light">
                <FaTrash />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default UserTable;
