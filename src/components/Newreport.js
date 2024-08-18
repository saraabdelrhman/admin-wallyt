import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const Newreport = () => {
  return (
    <Container className="mt-4">
      <h2 className="fw-bold pb-2">Add New Report</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="reportId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Report ID" value="0003" readOnly />
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
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value="Pending">
                <option>Pending</option>
                <option>Resolved</option>
                <option>Dismissed</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="report">
              <Form.Label>Report</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter Report Details" value="This review has been flagged for inappropriate content." />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="createdAt">
              <Form.Label>Created At</Form.Label>
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

export default Newreport;
