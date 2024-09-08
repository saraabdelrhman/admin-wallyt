import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Replaced with FaSearch
import { Link } from 'react-router-dom';

const Report = () => { 
  const [reports, setReports] = useState([]);  // Changed to handle multiple reports
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to use if the fetch fails
  const fakeData = {
    reports: [
      { id: '1', Reviewid: '456', Userid: '7897', report: 'Spam content' },
      { id: '2', Reviewid: '789', Userid: '1234', report: 'Abusive language' },
      { id: '3', Reviewid: '321', Userid: '4321', report: 'Misleading information' },
      { id: '4', Reviewid: '654', Userid: '5678', report: 'Inappropriate content' },
      { id: '5', Reviewid: '987', Userid: '8765', report: 'Offensive language' }
    ],
    totalPages: 1 // Assume only 1 page of fake data
  };

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/reports?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reports data');
        }
        const data = await response.json();
        setReports(data.reports); // Assuming `reports` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setReports(fakeData.reports); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
        setLoading(false);
      }
    };

    fetchReports();
  }, [page, size]); // Refetch data when page or size changes

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/report/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete report');
        }
        alert('Report deleted successfully!');
        setReports(reports.filter(report => report.id !== id)); // Remove deleted report from the list
      } catch (error) {
        alert(`Error deleting report: ${error.message}`);
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
      <h2 className="fw-bold pb-2">Report Moderation</h2>
      
      {/* Search Bar */}
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search reports by review or user"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
              <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>

        {/* Add New Report Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newreport'>
            <Button variant="warning" size="md">+ Add New Report</Button>
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

      {/* Reports Table */}
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Review Id</th>
            <th>User Id</th>
            <th>Report</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : (
            reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.Reviewid}</td>
                <td>{report.Userid}</td>
                <td>{report.report}</td>
                <td>
                  <Link to={`/reportview/${report.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                      <FaEye />
                    </Button>
                  </Link>
                  <Link to={`/reportedit/${report.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    className="me-2 mb-1 text-danger" 
                    variant="light"
                    onClick={() => handleDelete(report.id)}
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

export default Report;
