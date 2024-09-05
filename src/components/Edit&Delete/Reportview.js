import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ReportDetails = ({ reportId }) => {
  // Initial state with fake data
  const [reportDetails, setReportDetails] = useState({
    id: 'TempID123',
    reviewId: 'Review456',
    userId: 'User789',
    report: 'Initial fake report description goes here.',
    status: 'Pending',
    createdAt: '2023-09-01'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await fetch(`https://wallyt.com/reports/${reportId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReportDetails(data); // Update state only if fetch is successful
        setLoading(false);
      } catch (error) {
        console.error('Error fetching report details:', error.message);
        setError('Failed to load report details.');
        setLoading(false);
        // If fetch fails, we keep using the fake data.
      }
    };

    fetchReportDetails();
  }, [reportId]); // Dependency array includes reportId to refetch when it changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container className="d-flex vh-100">
      <Row className="m-auto align-self-center w-100">
        <Col md={6} className="offset-md-3">
          <h1 className="text-center">Report Details</h1>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="mt-4">
            <p><strong>ID:</strong> {reportDetails.id}</p>
            <p><strong>Review ID:</strong> {reportDetails.reviewId}</p>
            <p><strong>User ID:</strong> {reportDetails.userId}</p>
            <p><strong>Report Content:</strong> {reportDetails.report}</p>
            <p><strong>Status:</strong> {reportDetails.status}</p>
            <p><strong>Created At:</strong> {reportDetails.createdAt}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDetails;
