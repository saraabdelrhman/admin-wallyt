import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Comment = () => {
  const [comment, setComment] = useState({
    id: '1',
    reviewId: 'good',
    userId: '2365'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch('https://wallyt.com/comment'); // Correct API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch comment data');
        }
        const data = await response.json();
        setComment(data); // Set fetched comment data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    setTimeout(fetchComment, 2000); // Simulated delay for fetching
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/comment/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete comment');
        }
        alert('Comment deleted successfully!');
        setComment(null); // Optionally clear the comment data after deletion
      } catch (error) {
        alert(`Error deleting comment: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Comment Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search comments by user or comment"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch /> {/* Consistent use of FaSearch icon */}
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newcomment'>
            <Button variant="warning" size="md">+ Add New Comment</Button>
          </Link>
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review ID</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{loading ? 'Loading...' : comment ? comment.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : comment ? comment.reviewId : 'N/A'}</td>
            <td>{loading ? 'Loading...' : comment ? comment.userId : 'N/A'}</td>
            <td>
              <Link to='/commentview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !comment}>
                  <FaEye />
                </Button>
              </Link>
              <Link to='/commentedit'>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !comment}>
                  <FaEdit />
                </Button>
              </Link>
              <Button
                size="sm"
                className="me-2 mb-1 text-danger"
                variant="light"
                onClick={() => comment && handleDelete(comment.id)} // Corrected to use comment.id
                disabled={loading || !comment}
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

export default Comment;
