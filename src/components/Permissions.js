import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Role = () => {
  const [roles, setRoles] = useState([]);  // State for handling multiple roles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  const fakeData = {
    roles: [
      { id: '1', name: 'Admin', permissions: 'Full Access' },
      { id: '2', name: 'Editor', permissions: 'Edit Content' },
      { id: '3', name: 'Viewer', permissions: 'View Only' },
      { id: '4', name: 'Moderator', permissions: 'Manage Comments' },
      { id: '5', name: 'Contributor', permissions: 'Submit Content' }
    ],
    totalPages: 1  // Assume only 1 page of fake data
  };

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/roles?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch roles data');
        }
        const data = await response.json();
        setRoles(data.roles); // Assuming `roles` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setRoles(fakeData.roles); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
        setLoading(false);
      }
    };

    fetchRoles();
  }, [page, size]); // Refetch data when page or size changes

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
        setRoles(roles.filter(role => role.id !== id)); // Remove deleted role from the list
      } catch (error) {
        alert(`Error deleting role: ${error.message}`);
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
      <h2 className="fw-bold pb-2">Roles Management</h2>
      
      {/* Search Bar */}
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

        {/* Add New Role Button */}
        <Col md={3} className="d-flex justify-content-md-end mt-2">
          <Link to='/newrole'>
            <Button className='btn btn-warning' size="md">+ Add New Permissions</Button>
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

      {/* Roles Table */}
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="3">Loading...</td></tr>
          ) : (
            roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions}</td>
                <td>
                  {/* <Link to={`/roleview/${role.id}`}> */}
                  <Link to={'/permissionsview'}>
                    <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                      <FaEye />
                    </Button>
                  </Link>
                  {/* <Link to={`/roleedit/${role.id}`}> */}
                  <Link to={'/permissionsedit'}>
                    <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                      <FaEdit />
                    </Button>
                  </Link>   
                  <Button 
                    size="sm" 
                    className="me-2 mb-1 text-danger" 
                    variant="light"
                    onClick={() => handleDelete(role.id)}
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

export default Role;
