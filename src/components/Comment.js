import React from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Comment = () => {
  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Comment Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search comments by user or review"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
              <Button className="bg-dark" id="button-addon2">
              <FaSearch /> {/* Consistent use of FaSearch icon */}
            </Button>
          </InputGroup>
        </Col>
       <Col md={3} className="d-flex justify-content-md-end mt-2">
       <Link to='/newcomment'>    <Button variant="warning" size="md">+ Add New Comment</Button></Link>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review Id</th>
            <th>User Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0003</td>
            <td>233</td>
            <td>787</td>
            <td>
              <Link to='/commentview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                  <FaEye />
                </Button>
              </Link>
              <Link to='/Commentedit'>
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

export default Comment;
