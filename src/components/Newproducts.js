import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

const Newproducts = () => {
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    categoryid: '',
    brand: '',
    description: '',
    photo: null, // To hold the file object
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductDetails({ ...productDetails, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', productDetails.id);
    formData.append('name', productDetails.name);
    formData.append('categoryid', productDetails.categoryid);
    formData.append('brand', productDetails.brand);
    formData.append('description', productDetails.description);
    formData.append('photo', productDetails.photo);
  
    try {
      const response = await fetch('https://wallyt.com/products/images', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Product details submitted:', data);
      } else {
        console.error('Error submitting product details:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };
  

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">Add New Product</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductID" className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product ID"
                name="id"
                value={productDetails.id}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formProductName" className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="name"
                value={productDetails.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductCategoryID" className="mb-3">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category ID"
                name="categoryid"
                value={productDetails.categoryid}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formProductBrand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                name="brand"
                value={productDetails.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formProductDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                name="description"
                value={productDetails.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formProductPhoto" className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                onChange={handleFileChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="warning"  type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default Newproducts;

