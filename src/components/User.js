import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import searchIcon from './images/search-normal.png'; // Ensure you have this image in the specified path
import '../App.css'; // Ensure your CSS is properly set up
import photo from './images/photo.png';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Define fake data inside the component
  const fakeData = {
    users: [
      { id: '1', email: 'fake.john@example.com', name: 'John Doe', role: 'Admin' },
      { id: '2', email: 'fake.jane@example.com', name: 'Jane Doe', role: 'User' },
      { id: '3', email: 'fake.jack@example.com', name: 'Jack Smith', role: 'Moderator' },
    ],
    totalPages: 1
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/users?page=${page}&size=${size}`);
        if (!response.ok) throw new Error('Failed to fetch users data');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
        setUsers(fakeData.users); // Use fake data if the API request fails
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, size]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`https://wallyt.com/Users/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete user');
        alert('User deleted successfully!');
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  return (
    <Container fluid className="d-flex flex-column  mt-5" style={{width: '80%',marginLeft:'16%'}}>
      <Row className="mb-4 align-items-center">
        <Col md={6}>
        <div style={{width: '100%', height: '100%', paddingLeft: 18, paddingRight: 18, paddingTop: 11.25, paddingBottom: 11.25, borderRadius: 56.25, border: '1.12px #EEEEEE solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
    <div style={{textAlign: 'right', color: '#7F8190', fontSize: 18, fontFamily: 'Poppins', fontWeight: '400', wordWrap: 'break-word'}}>Search </div>
    <div style={{width: 36, height: 36, background: '#377BF7', borderRadius: 56.25, justifyContent: 'center', alignItems: 'center', gap: 11.25, display: 'flex'}}>
        <div style={{width: 18, height: 18, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div style={{width: 18, height: 18, position: 'relative'}}>
                <img src={searchIcon} style={{width: 18, height: 18, left: 0, top: 0, position: 'absolute', opacity: 1}}></img>
            </div>
        </div>
    </div>
</div>
        </Col>
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <div className="text-end">
            <div className="fw-bold" style={{ fontSize: 18 }}>Elisa</div>
            <div style={{ color: '#7F8190', fontSize: 15 }}>Admin</div>
          </div>
          <img src={photo} style={{
            width: 51.75, height: 51.75, marginLeft: 10,
            background: '#E6D3F8', borderRadius: '50%',
            display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            {/* Placeholder for user avatar */}
          </img>
        </Col>
      </Row>
<h2 className='fw-bold'>User</h2>
      {/* Users Table */}
      <Row className="flex-grow-1">
        <Table responsive="md" striped bordered hover>
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
            {loading ? <tr><td colSpan="5">Loading...</td></tr> :
              users.map(user => (
                <tr key={user.id} className='rounded-5'>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* <Link to={`/singleuser/${user.id}`}> */}
                    <Link to={'/singleuser'}>
                      <Button size="sm" className="me-2 mb-1 bg-transparent text-dark"><FaEye /></Button>
                    </Link>
                    {/* <Link to={`/useredit/${user.id}`}> */}
                    <Link to={'/useredit'}>
                      <Button  size="sm" className="me-2 mb-1 bg-transparent text-dark"><FaEdit /></Button>
                    </Link>
                    <Link><Button size="sm" className="me-2 mb-1  bg-transparent text-dark" onClick={() => handleDelete(user.id)}>
                      <FaTrash />    </Button></Link>
                 
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Row>
      <div style={{width: '100%', height: '100%', justifyContent: 'center',right:'0',left:'0',width:'100',height:'100', bottom:'0',position:'fixed',alignItems: 'center', gap: 20, display: 'inline-flex'}}>
        {/* Left Arrow */}
        <button className="pagination-arrow" style={{ border: 'none', background: 'transparent', marginBottom:'30px' }}>
          <FaArrowLeft style={{ fontSize: '24px', color: '#377BF7' }} />
        </button>

        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex', marginBottom:'30px'}}>
          {/* Pagination buttons */}
          <div style={{paddingTop: 10, paddingBottom: 10, background: '#377BF7', borderRadius: '50%', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '600', lineHeight: 20, wordWrap: 'break-word'}}>01</div>
          </div>
          <div style={{paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: '50%', border: '1px #E4E7E9 solid', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: '#191C1F', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>02</div>
          </div>
          <div style={{paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: '50%', border: '1px #E4E7E9 solid', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: '#191C1F', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>03</div>
          </div>
          <div style={{paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: '50%', border: '1px #E4E7E9 solid', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: '#191C1F', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>04</div>
          </div>
          <div style={{paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: '50%', border: '1px #E4E7E9 solid', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: '#191C1F', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>05</div>
          </div>
          <div style={{paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: '50%', border: '1px #E4E7E9 solid', justifyContent: 'center', alignItems: 'center', width: '40px', height: '40px', display: 'flex'}}>
            <div style={{textAlign: 'center', color: '#191C1F', fontSize: 14, fontFamily: 'Public Sans', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>06</div>
          </div>
          {/* More pagination buttons */}
        </div>

        {/* Right Arrow */}
        <button className="pagination-arrow" style={{ border: 'none', background: 'transparent', marginBottom:'30px' }}>
          <FaArrowRight style={{ fontSize: '24px', color: '#377BF7' }} />
        </button>
      </div>
    </Container>
  );
};

export default Users;
