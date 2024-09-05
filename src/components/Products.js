import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Added FaSearch
import { Link } from 'react-router-dom';

const Products = () => {
    const [product, setProduct] = useState({
      id: '1',
      name: 'John Doe',
      categoryid: '585',
      brand: 'samsung'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await fetch('https://wallyt.com/product'); // Your API endpoint to fetch product data
          if (!response.ok) {
            throw new Error('Failed to fetch product data');
          }
          const data = await response.json();
          setProduct(data); 
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      setTimeout(fetchProduct, 2000);
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
        try {
          const response = await fetch(`https://wallyt.com/product/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete product');
          }
          alert('Product deleted successfully!');
          setProduct(null); // Optionally clear the product data after deletion
        } catch (error) {
          alert(`Error deleting product: ${error.message}`);
        }
      }
    };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Product Management</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch /> {/* Replaced with FaSearch icon for consistency */}
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newproducts'>
            <Button variant="warning" size="md">+ Add New Product</Button>
          </Link>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category Id</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{loading ? 'Loading...' : product ? product.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : product ? product.name : 'N/A'}</td>
            <td>{loading ? 'Loading...' : product ? product.categoryid : 'N/A'}</td> {/* Fixed to use categoryid */}
            <td>{loading ? 'Loading...' : product ? product.brand : 'N/A'}</td> {/* Fixed brand typo */}
            <td>
              <Link to={'/productview'}>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !product}>
                  <FaEye />
                </Button>
              </Link>
              <Link to={'/productedit'}>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !product}>
                  <FaEdit />
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light" 
                onClick={() => product && handleDelete(product.id)}
                disabled={loading || !product}
              >
                <FaTrash />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
