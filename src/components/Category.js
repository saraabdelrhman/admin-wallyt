import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Category = () => {
  const [category, setCategory] = useState({
    id: '1',
    name: 'John Doe',
    parentCategoryId: '858'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch('https://wallyt.com/category'); // Correct API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        setCategory(data); // Set fetched category data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    setTimeout(fetchCategory, 2000); // Simulated delay for fetching
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/category/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        alert('Category deleted successfully!');
        setCategory(null); // Optionally clear the category data after deletion
      } catch (error) {
        alert(`Error deleting category: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Category Management</h2>
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
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/Newcategory'>
            <Button className="btn btn-warning" size="md">+ Add New Category</Button>
          </Link> 
        </Col>
      </Row>
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
          <tr>
            <td>{loading ? 'Loading...' : category ? category.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : category ? category.name : 'N/A'}</td>
            <td>{loading ? 'Loading...' : category ? category.parentCategoryId : 'N/A'}</td>
            <td>
              <Link to='/categoryview'>
                <Button 
                  size="sm" 
                  className="me-2 mb-1 text-info" 
                  variant="light" 
                  disabled={loading || !category}>
                  <FaEye /> 
                </Button>
              </Link>
              <Link to='/categoryedit'>
                <Button 
                  size="sm" 
                  className="me-2 mb-1 text-success" 
                  variant="light" 
                  disabled={loading || !category}>
                  <FaEdit /> 
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light" 
                onClick={() => category && handleDelete(category.id)}
                disabled={loading || !category}>
                <FaTrash />
              </Button>
            </td>
          </tr>
          {/* Additional rows would be dynamically generated here */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Category;
