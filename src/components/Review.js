import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Added FaSearch
import { Link } from 'react-router-dom';

const Review = () => { // Capitalized component name
  const [review, setReview] = useState({
    id: '1',
    productId: '968',
    userId: '858',
    rating: 'Good' // Corrected to lowercase and proper string value
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch('https://wallyt.com/review');
        if (!response.ok) {
          throw new Error('Failed to fetch review data');
        }
        const data = await response.json();
        setReview(data); // Set fetched review data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    setTimeout(fetchReview, 2000); // Simulated delay for fetching
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/review/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete review');
        }
        alert('Review deleted successfully!');
        setReview(null); // Optionally clear the review data after deletion
      } catch (error) {
        alert(`Error deleting review: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Review Moderation</h2>
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
          <Link to='/newreview'>
            <Button variant="warning" size="md">+ Add New Review</Button>
          </Link>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Product Id</th>
            <th>User Id</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{loading ? 'Loading...' : review ? review.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : review ? review.productId : 'N/A'}</td>
            <td>{loading ? 'Loading...' : review ? review.userId : 'N/A'}</td>
            <td>{loading ? 'Loading...' : review ? review.rating : 'N/A'}</td>
            <td>
              <Link to='/reviewview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !review}>
                  <FaEye />
                </Button>
              </Link>
              <Link to='/reviewedit'>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !review}>
                  <FaEdit />
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light"  
                onClick={() => review && handleDelete(review.id)} // Corrected to use review.id
                disabled={loading || !review}
              >
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

export default Review; // Capitalized component name
