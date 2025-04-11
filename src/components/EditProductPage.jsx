import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  // State to hold form data and messages
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data); // Pre-fill the form with existing product data
      } catch (error) {
        setErrorMessage('Failed to fetch product data.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // The effect will re-run whenever the `id` changes

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission (PUT request)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Update product on the FakeStoreAPI with PUT request
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        {
          // parameters to update in here
        }
      );
      if (response.status === 200) {
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => {
          navigate(`/products/${id}`);
        }, 2000); 
      }
    } catch (error) {
      setErrorMessage('There was an error updating the product.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Edit Product</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}


      {isLoading && <div>Loading...</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Product'}
        </Button>
      </Form>
    </div>
  );
};

export default EditProductPage;