import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

const Users = () => {
  const [Users, setUsers] = useState({
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'Admin'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://wallyt.com/Users'); 
        if (!response.ok) {
          throw new Error('Failed to fetch Users data');
        }
        const data = await response.json();
        setUsers(data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false); 
      }
    };

    setTimeout(fetchUsers, 2000);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Users? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/Users/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete Users');
        }
        alert('Users deleted successfully!');
        setUsers(null); // Optionally clear the Users data
      } catch (error) {
        alert(`Error deleting Users: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="p-4">
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <h2 className="fw-bold">Users Management</h2>
        </Col>
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search by name or email"
              aria-label="Search"
            />
            <Button className="bg-dark" id="button-addon2">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

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
          <tr>
            <td>{loading ? 'Loading...' : Users ? Users.id : 'N/A'}</td>
            <td>{loading ? 'Loading...' : Users ? Users.email : 'N/A'}</td>
            <td>{loading ? 'Loading...' : Users ? Users.name : 'N/A'}</td>
            <td>{loading ? 'Loading...' : Users ? Users.role : 'N/A'}</td>
            <td>
              <Link to={'/singleuser'}>
                <Button size="sm" className="me-2 mb-1 text-info" variant="light" disabled={loading || !Users}>
                  <FaEye title="View Users" />
                </Button>
              </Link>
              <Link to={'/useredit'}>
                <Button size="sm" className="me-2 mb-1 text-success" variant="light" disabled={loading || !Users}>
                  <FaEdit title="Edit Users" />
                </Button>
              </Link>
              <Button 
                size="sm" 
                className="me-2 mb-1 text-danger" 
                variant="light" 
                onClick={() => Users && handleDelete(Users.id)}
                disabled={loading || !Users}
              >
                <FaTrash title="Delete Users" />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <nav aria-label="..." className=''>
  <ul class="pagination">
    <li class="page-item disabled">
      <Link class="page-link">Previous</Link>
    </li>
    <li class="page-item"><Link class="page-link" href="#">1</Link></li>
    <li class="page-item active" aria-current="page">
      <Link class="page-link" href="#">2</Link>
    </li>
    <li class="page-item"><Link class="page-link" href="#">3</Link></li>
    <li class="page-item">
      <Link class="page-link" href="#">Next</Link>
    </li>
  </ul>
</nav>
    </Container>
  );
};

export default Users;
