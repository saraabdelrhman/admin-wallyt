import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
const User = () => {
  return (
    <Container fluid className="p-4 ">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">User Management</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search users by name or email"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch /> 
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
        <Link to="/newuser">
            <Button variant="warning" size="md" className=''>+ Add New User</Button>
          </Link>
          </Col >
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

export default User;
