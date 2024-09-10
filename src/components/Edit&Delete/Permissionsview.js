import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Permissions = ({ permissionsId }) => {
  const [permissionsDetails, setPermissionsDetails] = useState({
    name: 'Web Designer',
    description: 'Doing the design of the website'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPermissionsDetails = async () => {
      try {
        const response = await fetch(`https://wallyt.com/permissions/${permissionsId}`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch permissions details');
        }
        const data = await response.json();
        setPermissionsDetails({
          name: data.permissionsName || 'N/A',
          description: data.permissionsDescription || 'N/A',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching permissions details:', error.message);
        setError('Failed to load permissions details.');
        setLoading(false);
      }
    };

    fetchPermissionsDetails();
  }, [permissionsId]);  // Dependency on permissionsId to refetch if it changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Permissions Details</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="d-flex flex-column align-items-center">
        <p><strong>Name:</strong> {permissionsDetails.name}</p>
        <p><strong>Description:</strong> {permissionsDetails.description}</p>
      </div>
    </Container>
  );
};

export default Permissions;
