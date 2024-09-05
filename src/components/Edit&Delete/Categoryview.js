import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Category = ({ categoryId }) => {
  const [categoryDetails, setCategoryDetails] = useState({
    id: '',
    name: '',
    parentCategoryId: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`https://wallyt.com/category/${categoryId}`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch category details');
        }
        const data = await response.json();
        setCategoryDetails({
          id: data.id,
          name: data.name,
          parentCategoryId: data.parentCategoryId || 'N/A'  // Fallback if no parent category
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category details:', error);
        setError(error.message);

        // Fallback fake data in case of error
        setCategoryDetails({
          id: '0003',
          name: 'Phone',
          parentCategoryId: '22'
        });

        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);  // Re-fetch when categoryId changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Category Details</h2>
      {error && <div className="text-danger mb-3">Error: {error}. Showing fallback data.</div>}
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> {categoryDetails.id}</p>
        <p><strong>Name:</strong> {categoryDetails.name}</p>
        <p><strong>Parent Category ID:</strong> {categoryDetails.parentCategoryId}</p>
      </div>
    </Container>
  );
};

export default Category;
