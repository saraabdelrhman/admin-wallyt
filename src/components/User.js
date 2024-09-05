import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to be used in case of a fetch error
  const fakeData = [
    { id: '1', email: 'fake.john@example.com', name: 'John Doe', role: 'Admin' },
    { id: '2', email: 'fake.jane@example.com', name: 'Jane Doe', role: 'User' },
    { id: '3', email: 'fake.jack@example.com', name: 'Jack Smith', role: 'Moderator' },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/categories?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const data = await response.json();
        setUsers(data.content); // Assuming data contains users in a 'content' field
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
      } catch (error) {
        setError(error.message);
        setUsers(fakeData); // Use fake data if the API request fails
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size]); // Refetch when page or size changes

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/Users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        alert('User deleted successfully!');
        setUsers(users.filter(user => user.id !== id)); // Remove the deleted user from the list
      } catch (error) {
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setSize(newSize); 
    setPage(0); 
  };

  return (
    <Container fluid className="p-4 d-flex flex-column min-vh-100">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">Users Management</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <FormControl placeholder="Search by name or email" aria-label="Search" />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

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

      <Row className="flex-grow-1">
        <Table responsive="md" striped bordered hover className="user-table">
          <thead className="bg-light">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/singleuser/${user.id}`}>
                      <Button size="sm" className="me-2 mb-1 text-info" variant="light">
                        <FaEye title="View User" />
                      </Button>
                    </Link>
                    <Link to={`/useredit/${user.id}`}>
                      <Button size="sm" className="me-2 mb-1 text-success" variant="light">
                        <FaEdit title="Edit User" />
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      className="me-2 mb-1 text-danger"
                      variant="light"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash title="Delete User" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Row>

      {/* Pagination at the Footer */}
      <Row className="justify-content-center mt-auto">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
              <Button className="page-link" onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                Previous
              </Button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${index === page ? 'active' : ''}`}>
                <Button className="page-link" onClick={() => handlePageChange(index)}>
                  {index + 1}
                </Button>
              </li>
            ))}
            <li className={`page-item ${page === totalPages - 1 ? 'disabled' : ''}`}>
              <Button className="page-link" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                Next
              </Button>
            </li>
          </ul>
        </nav>
      </Row>
    </Container>
  );
};

export default Users;


