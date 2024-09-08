import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to use if fetching fails
  const fakeData = {
    categories: [
      { id: '1', name: 'Electronics', parentCategoryId: '0' },
      { id: '2', name: 'Books', parentCategoryId: '0' },
      { id: '3', name: 'Clothing', parentCategoryId: '0' },
      { id: '4', name: 'Home Appliances', parentCategoryId: '0' },
      { id: '5', name: 'Groceries', parentCategoryId: '0' },
    ],
    totalPages: 1 // Assume 1 page of fake data
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/categories?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories); // Assuming `categories` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
      } catch (error) {
        setError(error.message);
        setCategories(fakeData.categories); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, size]); // Refetch categories when page or size changes

  // Delete category handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://api.example.com/category/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        alert('Category deleted successfully!');
        setCategories(categories.filter(category => category.id !== id)); // Remove deleted category from the list
      } catch (error) {
        alert(`Error deleting category: ${error.message}`);
      }
    }
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0); // Reset to the first page when size changes
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Category Management</h2>
      
      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search categories by name"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        
        {/* Add New Category Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newcategory'>
            <Button className="btn btn-warning" size="md">+ Add New Category</Button>
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

      {/* Category Table */}
      <Table responsive="md" striped bordered hover className="category-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent Category ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : (
            categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.parentCategoryId || 'N/A'}</td>
                <td>
                  <Link to={`/categoryview/${category.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                      <FaEye /> 
                    </Button>
                  </Link>
                  <Link to={`/categoryedit/${category.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                      <FaEdit /> 
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="me-2 mb-1 text-danger" 
                    variant="light" 
                    onClick={() => handleDelete(category.id)}
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

export default Category;


