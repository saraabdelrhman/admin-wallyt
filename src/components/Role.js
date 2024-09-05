import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Role = () => {
  const [role, setRole] = useState({
    role: 'admin',
    permissions: 'delete profiles',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch('https://wallyt.com/role'); // Correct API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch role data');
        }
        const data = await response.json();
        setRole(data); // Set fetched role data
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    setTimeout(fetchRole, 2000); // Simulated delay for fetching
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/role/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete role');
        }
        alert('Role deleted successfully!');
        setRole(null); // Optionally clear the role data after deletion
      } catch (error) {
        alert(`Error deleting role: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="fw-bold pb-2">Roles Management</h2>
      <Row className="mb-3">
        <Col md={9}>
          <InputGroup>
            <FormControl
              placeholder="Search roles by name or permission"
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newrole'>
            <Button className='btn btn-warning' size="md">+ Add New Role</Button>
          </Link> 
        </Col>
      </Row>
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{loading ? 'Loading...' : role ? role.role : 'N/A'}</td>
            <td>{loading ? 'Loading...' : role ? role.permissions : 'N/A'}</td>
            <td>
              <Link to='/roleview'>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !role}>
                  <FaEye />
                </Button>
              </Link>
              <Link to='/roleedit'>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !role}>
                  <FaEdit />
                </Button>
              </Link>   
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light"
                onClick={() => role && handleDelete(role.id)}
                disabled={loading || !role}
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

export default Role;
