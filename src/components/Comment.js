import React, { useState, useEffect } from 'react';
import { Button, Table, InputGroup, FormControl, Container, Row, Col, Pagination, Form } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaSearch, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import searchIcon from './images/search-normal.png'; // Ensure you have this image in the specified path
import '../App.css'; // Ensure your CSS is properly set up
import photo from './images/photo.png';

const Review = () => {
  const [reviews, setReviews] = useState([]);  // Changed to handle multiple reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(0); // Current page number
  const [size, setSize] = useState(10); // Default page size
  const [totalPages, setTotalPages] = useState(1); // Total pages

  // Fake data to use if the fetch fails
  const fakeData = {
    reviews: [
      { id: '1', title: 'Great Product', userId: '2365' },
      { id: '2', title: 'Not Bad', userId: '1234' },
      { id: '3', title: 'Would Buy Again', userId: '5678' },
      { id: '4', title: 'Terrible Experience', userId: '9101' },
      { id: '5', title: 'Decent Value', userId: '1121' },
    ],
    totalPages: 1 // Assume only 1 page of fake data
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://wallyt.com/reviews?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews data');
        }
        const data = await response.json();
        setReviews(data.reviews); // Assuming `reviews` is an array in the API response
        setTotalPages(data.totalPages); // Assuming total pages info is provided in 'totalPages'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setReviews(fakeData.reviews); // Use fake data if the API request fails
        setTotalPages(fakeData.totalPages);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page, size]); // Refetch data when page or size changes

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
      try {
        const response = await fetch(`https://wallyt.com/review/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to delete review');
        }
        alert('Review deleted successfully!');
        setReviews(reviews.filter(review => review.id !== id)); // Remove deleted review from the list
      } catch (error) {
        alert(`Error deleting review: ${error.message}`);
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
<h2 className='fw-bold'>Comments</h2>


      {/* Reviews Table */}
      <Table responsive="md" striped bordered hover className="product-table">
        <thead className="bg-dark text-white">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : (
            reviews.map(review => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.title}</td>
                <td>{review.userId}</td>
                <td>
                  {/* <Link to={`/reviewview/${review.id}`}> */}
                  <Link to={'/reviewview'}>
                    <Button size="sm" className="me-2 mb-1 text-info  bg-transparent text-dark">
                      <FaEye />
                    </Button>
                  </Link>
                  {/* <Link to={`/reviewedit/${review.id}`}> */}
                  <Link to={'/reviewedit'}>
                    <Button size="sm" className="me-2 mb-1 text-success  bg-transparent text-dark">
                      <FaEdit />
                    </Button>
                  </Link>
                  <Link><Button size="sm" className="me-2 mb-1  bg-transparent text-dark" onClick={() => handleDelete(review.id)}>
                  <FaTrash />    </Button></Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

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

export default Review;


