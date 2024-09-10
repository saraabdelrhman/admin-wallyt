import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Products = ({ productId }) => {
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    categoryId: '',
    brand: '',
    description: '',
    image: 'https://via.placeholder.com/150'  // Default placeholder image
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://wallyt.com/product/images${productId}`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProductDetails({
          id: data.id,
          name: data.name,
          categoryId: data.categoryId,
          brand: data.brand,
          description: data.description,
          image: data.image || 'https://via.placeholder.com/150'  // Use fetched image or placeholder
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError(error.message);

        // Set fallback fake data in case of error
        setProductDetails({
          id: '0003',
          name: 'Laptop',
          categoryId: '5525',
          brand: 'Apple',
          description: 'For learning',
          image: 'https://via.placeholder.com/150'
        });

        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);  // Re-fetch when productId changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Product Details</h2>
      {error && <div className="text-danger mb-3">Error: {error}. Showing fallback data.</div>}
      <div className="d-flex flex-column align-items-center">
        <p><strong>ID:</strong> {productDetails.id}</p>
        <p><strong>Name:</strong> {productDetails.name}</p>
        <p><strong>Category ID:</strong> {productDetails.categoryId}</p>
        <p><strong>Brand:</strong> {productDetails.brand}</p>
        <p><strong>Description:</strong> {productDetails.description}</p>
        <div className="d-flex flex-column align-items-center">
          <strong>Image:</strong>
          <img
            src={productDetails.image}
            alt={productDetails.name}
            className="rounded-circle mt-2"
            style={{ width: '150px', height: '150px' }} // Custom size for the product image
          />
        </div>
      </div>
    </Container>
  );
};

export default Products;
