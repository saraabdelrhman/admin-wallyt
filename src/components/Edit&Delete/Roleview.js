import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const Role = ({ roleId }) => {
  const [roleDetails, setRoleDetails] = useState({
    role: 'Web Designer',
    permissions: 'Doing the design of the website'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoleDetails = async () => {
      try {
        const response = await fetch(`https://wallyt.com/roles/${roleId}`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch role details');
        }
        const data = await response.json();
        setRoleDetails({
          role: data.role,
          permissions: data.permissions
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching role details:', error.message);
        setError('Failed to load role details.');
        setLoading(false);
        // If the API call fails, we keep using the fake data in the state
      }
    };

    fetchRoleDetails();
  }, [roleId]);  // Dependency on roleId to refetch if it changes

  if (loading) return <Container>Loading...</Container>;

  return (
    <Container fluid className="mt-4 text-center">
      <h2 className="fw-bold pb-3">Role Details</h2>
      {error && <p className="text-danger">{error}</p>}
      <div className="d-flex flex-column align-items-center">
        <p><strong>Role:</strong> {roleDetails.role}</p>
        <p><strong>Permissions:</strong> {roleDetails.permissions}</p>
      </div>
    </Container>
  );
};

export default Role;
