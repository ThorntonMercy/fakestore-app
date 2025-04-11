import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure you import Bootstrap styles
import HomePage from './components/HomePage';
import ProductListingPage from './components/ProductListingPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import AddProductPage from './components/AddProductPage';
import EditProductPage from './components/EditProductPage';
import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <Router>
      {/* Navigation Bar (always present across all pages) */}
      <NavigationBar />
      
      {/* Main content area */}
      <div className="container mt-4">
        <Routes>
          {/* Define the routes for different pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          
          {/* You can add a fallback for 404 pages */}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;