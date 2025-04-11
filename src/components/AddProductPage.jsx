import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  // State to handle form input values
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  // State to handle the confirmation message
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // State for form submission loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Use navigate to redirect after success

  // Function to handle bootstrap form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    setSuccessMessage(''); 
    setErrorMessage('');

    // Create the new product object
    const newProduct = {
      title,
      price: parseFloat(price),
      description,
      category,
      image: 'https://via.placeholder.com/150',
    };

    try {
      const response = await axios.post('https://fakestoreapi.com/products', newProduct);

      if (response.status === 200) {
        setSuccessMessage('Product added successfully!');
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }
    } catch (error) {
      setErrorMessage('There was an error adding the product.');
      console.error(error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container">
      <h2>Add a New Product</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Product Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Product'}
        </Button>
      </Form>
    </div>
  );
};

export default AddProductPage;