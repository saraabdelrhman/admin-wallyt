import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Review = () => {
  const [reviews, setReviews] = useState([]);  // Changed to handle multiple reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to use if the fetch fails
  const fakeData = {
    reviews: [
      { id: '1', title: 'Great Product', userId: '2365' },
      { id: '2', title: 'Not Bad', userId: '1234' },
      { id: '3', title: 'Would Buy Again', userId: '5678' },
      { id: '4', title: 'Terrible Experience', userId: '9101' },
      { id: '5', title: 'Decent Value', userId: '1121' },
    ],
    totalPages: 1 // Assume only 1 page of fake data
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/reviews?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews data');
        }
        const data = await response.json();
        setReviews(data.reviews); // Assuming `reviews` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setReviews(fakeData.reviews); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, size]); // Refetch data when page or size changes

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
        setReviews(reviews.filter(review => review.id !== id)); // Remove deleted review from the list
      } catch (error) {
        alert(`Error deleting review: ${error.message}`);
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
      <h2 className="fw-bold pb-2">Review Moderation</h2>
      
      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search reviews by user or title"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Add New Review Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newreview'>
            <Button variant="warning" size="md">+ Add New Review</Button>
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

      {/* Reviews Table */}
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : (
            reviews.map(review => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.title}</td>
                <td>{review.userId}</td>
                <td>
                  {/* <Link to={`/reviewview/${review.id}`}> */}
                  <Link to={'/reviewview'}>
                    <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                      <FaEye />
                    </Button>
                  </Link>
                  {/* <Link to={`/reviewedit/${review.id}`}> */}
                  <Link to={'/reviewedit'}>
                    <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="me-2 mb-1 text-danger" 
                    variant="light"
                    onClick={() => handleDelete(review.id)}
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

export default Review;


