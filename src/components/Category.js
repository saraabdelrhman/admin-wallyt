import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaSearch, FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import searchIcon from './images/search-normal.png'; // Ensure you have this image in the specified path
import '../App.css'; // Ensure your CSS is properly set up
import photo from './images/photo.png';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to use if fetching fails
  const fakeData = {
    categories: [
      { id: '1', name: 'Electronics', parentCategoryId: '0' },
      { id: '2', name: 'Books', parentCategoryId: '0' },
      { id: '3', name: 'Clothing', parentCategoryId: '0' },
      { id: '4', name: 'Home Appliances', parentCategoryId: '0' },
      { id: '5', name: 'Groceries', parentCategoryId: '0' },
    ],
    totalPages: 1 // Assume 1 page of fake data
  };

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.example.com/categories?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories); // Assuming `categories` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
      } catch (error) {
        setError(error.message);
        setCategories(fakeData.categories); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page, size]); // Refetch categories when page or size changes

  // Delete category handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://api.example.com/category/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete category');
        }
        alert('Category deleted successfully!');
        setCategories(categories.filter(category => category.id !== id)); // Remove deleted category from the list
      } catch (error) {
        alert(`Error deleting category: ${error.message}`);
      }
    }
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Handle page size change
  const handleSizeChange = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0); // Reset to the first page when size changes
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
<h2 className='fw-bold'>Categories</h2>

      {/* Category Table */}
      <Table responsive="md" striped bordered hover className="category-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent Category ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : (
            categories.map(category => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category.parentCategoryId || 'N/A'}</td>
                <td>
                  <Link to={`/categoryview/${category.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-info  bg-transparent text-dark" >
                      <FaEye /> 
                    </Button>
                  </Link>
                  <Link to={`/categoryedit/${category.id}`}>
                    <Button size="sm" className="me-2 mb-1 text-success  bg-transparent text-dark" >
                      <FaEdit /> 
                    </Button>
                  </Link>
                  <Link><Button size="sm" className="me-2 mb-1  bg-transparent text-dark" onClick={() => handleDelete(category.id)}>
                      <FaTrash />    </Button></Link>
                 
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination Section */}
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

export default Category;


