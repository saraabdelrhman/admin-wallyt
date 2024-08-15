import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';

const ProductEdit = () => {
  const [product, setProduct] = useState({
    id: '0003',
    name: 'Laptopb',
    categoryId: '5525',
    brand: 'Apple',
    description: 'For learning',
    image: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    setProduct({
      ...product,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSave = () => {
    // Here you would typically save the updated product data to your backend
    console.log('Saved product:', product);
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Edit Product</h2>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={product.id}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductCategoryId">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                name="categoryId"
                value={product.categoryId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formProductBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              {product.image && (
                <img
                  src={product.image}
                  alt="Product"
                  className="rounded-circle mt-2"
                  style={{ width: '100px', height: '100px' }}
                />
              )}
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handleSave}>
          <FaSave /> Save
        </Button>
      </Form>
    </Container>
  );
};

export default ProductEdit;
