import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">
        <Button variant="warning" >Go to Home</Button>
      </Link>
    </Container>
  );
};

export default NotFound;
