import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);  // Changed to handle multiple products
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [page, setPage] = useState(0); // Current page number
    const [size, setSize] = useState(10); // Default page size
    const [totalPages, setTotalPages] = useState(1); // Total pages

    // Fake data to use if the fetch fails
    const fakeData = {
      products: [
        { id: '1', name: 'Product 1', categoryid: '585', brand: 'Samsung' },
        { id: '2', name: 'Product 2', categoryid: '123', brand: 'Apple' },
        { id: '3', name: 'Product 3', categoryid: '456', brand: 'Sony' },
        { id: '4', name: 'Product 4', categoryid: '789', brand: 'LG' },
        { id: '5', name: 'Product 5', categoryid: '987', brand: 'Google' }
      ],
      totalPages: 1 // Assume only 1 page of fake data
    };

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://wallyt.com/products?page=${page}&size=${size}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product data');
          }
          const data = await response.json();
          setProducts(data.products); // Assuming `products` is an array in the API response
          setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setProducts(fakeData.products); // Use fake data if the API request fails
          setTotalPages(fakeData.totalPages);
          setLoading(false);
        }
      };

      fetchProducts();
    }, [page, size]); // Refetch data when page or size changes

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
          setProducts(products.filter(product => product.id !== id)); // Remove deleted product from the list
        } catch (error) {
          alert(`Error deleting product: ${error.message}`);
        }
      }
    };

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };

    const handleSizeChange = (e) => {
      setSize(parseInt(e.target.value));
      setPage(0); // Reset to the first page when size changes
    };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Product Management</h2>
      
      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search products by name or brand"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Add New Product Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newproducts'>
            <Button variant="warning" size="md">+ Add New Product</Button>
          </Link>
        </Col>
      </Row>

      {error && <div className="alert alert-warning">Using fake data due to error: {error}</div>}

      {/* Items per page selection */}
      <Row className="mb-4">
        <Col>
          <Form.Label>Items per page:</Form.Label>
          <Form.Select onChange={handleSizeChange} value={size} style={{ width: '150px' }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="100">100</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Products Table */}
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
          {loading ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.categoryid}</td>
                <td>{product.brand}</td>
                <td>
                  {/* <Link to={`/productview/${product.id}`}> */}
                  <Link to={'/productview'}>
                    <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                      <FaEye />
                    </Button>
                  </Link>
                  {/* <Link to={`/productedit/${product.id}`}> */}
                  <Link to={'/productedit'}>
                    <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="me-2 mb-1 text-danger" 
                    variant="light" 
                    onClick={() => handleDelete(product.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination Section */}
      <Pagination className="mt-3">
        <Pagination.First onClick={() => handlePageChange(0)} disabled={page === 0} />
        <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
        {[...Array(totalPages).keys()].map(p => (
          <Pagination.Item key={p} active={p === page} onClick={() => handlePageChange(p)}>
            {p + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
        <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1} />
      </Pagination>
    </Container>
  );
};

export default Products;
