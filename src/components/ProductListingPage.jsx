import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner animation="border" role="status" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Row>
      {products.map(product => (
        <Col key={product.id} md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" className="product-image" src={product.image} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Link to={`/products/${product.id}`}>
                <Button variant="info">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductListingPage;