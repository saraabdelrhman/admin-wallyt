import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const Newcomment = () => {
  return (
    <Container className="mt-4">
      <h2 className="fw-bold pb-2">Add Comment</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="commentId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Comment ID" value="0003" readOnly />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="reviewId">
              <Form.Label>Review Id</Form.Label>
              <Form.Control type="text" placeholder="Enter Review ID" value="255" />
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
            <Form.Group controlId="createdAt">
              <Form.Label>Created At</Form.Label>
              <Form.Control type="text" placeholder="Enter Creation Date" value="2024-08-18" />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Comment" value="This is a sample comment." />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12} className="">
            <Button variant="warning"  type="submit" className="me-2">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Newcomment;
