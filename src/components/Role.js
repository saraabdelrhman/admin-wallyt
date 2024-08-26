import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye,FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Role = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2"> Roles Management</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
           <Button className="bg-dark" id="button-addon2">
              <FaSearch /> {/* Consistent icon usage */}
              <i className="bi bi-search"></i> 
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
       <Link to='/Newrole'>  <Button className='btn btn-warning' size="md">+ Add New Role</Button></Link> 
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>Role</th>
            <th>Permessions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>Web designer</td>
            <td>Doing the design of the website</td>   
            <td>
            <Link to='/roleview'><Button size="sm"  className="me-2 mb-1 text-info" variant="light">
                  <FaEye /> 
                </Button></Link>
           <Link to='/roleedit'><Button size="sm"  className="me-2 mb-1 text-success" variant="light">
                <FaEdit /> 
              </Button></Link>   
              <Button size="sm"  className="me-2 mb-1 text-danger" variant="light">
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


export default Role;
