import React, { useState , useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa'; // Replaced with FaSearch
import { Link } from 'react-router-dom';

const Report = () => { // Capitalized component name
const[report,Setreport]= useState({
  id: '1',
  Reviewid: '456',
 Userid: '7897',
  report: 'Admin'
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null); 

useEffect(() => {
  const fetchreport = async () => {
    try {
      const response = await fetch('https://wallyt.com/Report'); 
      if (!response.ok) {
        throw new Error('Failed to fetch Report data');
      }
      const data = await response.json();
      Setreport(data); 
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false); 
    }
  };
  setTimeout(fetchreport, 2000);
}, []);

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
      alert('report deleted successfully!');
      Setreport(null); // Optionally clear the report data
    } catch (error) {
      alert(`Error deleting report: ${error.message}`);
    }
  }
};


  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Report Moderation</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search reports by review or user"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
              <Button className="bg-dark" id="button-addon2">
              <FaSearch /> {/* Consistent icon usage */}
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
       <Link to='/newreport'>    <Button variant="warning" size="md">+ Add New Report</Button></Link>
        </Col>
      </Row>
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
          <tr>
          <td>{loading ? 'Loading...' : report ? report.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : report ? report.Reviewid : 'N/A'}</td>
            <td>{loading ? 'Loading...' : report ? report.Userid : 'N/A'}</td>
            <td>{loading ? 'Loading...' : report ? report.report : 'N/A'}</td>
            <td>
              <Link to='/reportview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light"  disabled={loading || !report}>
                  <FaEye />
                </Button>
              </Link>
              <Link to='/reportedit'>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light"  disabled={loading || !report}>
                  <FaEdit />
                </Button>
              </Link>
              <Button size="sm" className="me-2 mb-1 text-danger" variant="light" 
                onClick={() => report && handleDelete(report.id)}
              disabled={loading || !report}>
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

export default Report; 