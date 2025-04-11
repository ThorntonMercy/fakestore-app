import React, { useState, useEffect, useMemo } from 'react';
import { Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetailsPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); 

  // Choosing to use useMemo so it only runs when it needs to.
  const fetchProduct = useMemo(() => {
    return async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setErrorMessage('Error fetching product data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleEditClick = () => {
    navigate(`/edit-product/${id}`); 
  };

//   No actual built in cart functionality 
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    alert('Added to your theoretical cart. Your wallet thanks you for only fake shopping.');
  };

  const handleDelete = useMemo(() => {
    return async () => {
      try {
        const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
        if (response.status === 200) {
          alert('Product deleted successfully! PacMan thanks you for your sacrifice.');
          navigate('/products'); 
        }
      } catch (error) {
        setErrorMessage('There was an error deleting the product.');
        console.error(error);
      }
    };
  }, [id, navigate]);

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Product Details</h2>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {product && (
        <div>
          <h3>{product.title}</h3>
          <img className="product-image" src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>

          {/* Add to Cart button -- No actual built in cart functionality, just the button*/}
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          {/* Edit Product button */}
          <Button variant="primary" onClick={handleEditClick}>
            Edit Product
          </Button>

          {/* Delete Product button */}
          <Button variant="danger" onClick={handleShowModal}>
            Delete Product
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;