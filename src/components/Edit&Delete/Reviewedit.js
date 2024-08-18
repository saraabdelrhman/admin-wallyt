import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const Reviewedit = () => {
  return (
    <Container className="mt-4">
      <h2 className="fw-bold pb-2">Edit Review</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="reviewId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Review ID" value="0003" readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="productId">
              <Form.Label>Product Id</Form.Label>
              <Form.Control type="text" placeholder="Enter Product ID" value="255" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="userId">
              <Form.Label>User Id</Form.Label>
              <Form.Control type="text" placeholder="Enter User ID" value="189" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" placeholder="Enter Rating" value="4" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="reviews">
              <Form.Label>Reviews</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Review" value="Good" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="createdAt">
              <Form.Label>Created-At</Form.Label>
              <Form.Control type="text" placeholder="Enter Creation Date" value="2024-08-18" />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="warning"  type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default Reviewedit;




