import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Comment = ({ commentId }) => {
  const [commentDetails, setCommentDetails] = useState({
    id: '',
    reviewId: '',
    userId: '',
    commentText: '',
    createdAt: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetch(`https://wallyt.com/comment/${commentId}`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch comment details');
        }
        const data = await response.json();
        setCommentDetails({
          id: data.id,
          reviewId: data.reviewId,
          userId: data.userId,
          commentText: data.commentText,
          createdAt: data.createdAt
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comment details:', error);
        setError(error.message);

        // Set fallback fake data in case of error
        setCommentDetails({
          id: '0003',
          reviewId: '233',
          userId: '787',
          commentText: 'Not bad',
          createdAt: '2024'
        });

        setLoading(false);
      }
    };

    fetchCommentData();
  }, [commentId]);  // Re-fetch when commentId changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Comment Moderation</h2>
      {error && <div className="text-danger mb-3">Error: {error}. Showing fallback data.</div>}
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> {commentDetails.id}</p>
        <p><strong>Review ID:</strong> {commentDetails.reviewId}</p>
        <p><strong>User ID:</strong> {commentDetails.userId}</p>
        <p><strong>Comment:</strong> {commentDetails.commentText}</p>
        <p><strong>Created At:</strong> {commentDetails.createdAt}</p>
      </div>
    </Container>
  );
};

export default Comment;
