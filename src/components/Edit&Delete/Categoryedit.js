import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Correct import

const Categoryedit = () => {
  return (

<Container fluid className="mt-4">
<h2 className="fw-bold pb-2"> Category Management</h2>
<Row className="mb-3">
  <Col md={9}>
  <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button variant="outline-primary" id="button-addon2">
            <FaSearch /> 
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

export default Categoryedit;
