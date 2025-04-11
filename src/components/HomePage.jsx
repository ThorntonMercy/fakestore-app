import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

const HomePage = () => {
  const navigate = useNavigate(); 

  return (
    <div className="container text-center">
      <h1>Welcome to the Fake Store App!</h1>
      <p>Buy buy buy to your heart's desire with our fake store that harnesses the power of no shopping cart.
        <br />
        Take your dopamine hit without the credit card bill! Your wallet says THANK YOU and so do your delivery drivers!
      </p>
      <p>You can view our current fake products and you can fake edit them, fake delete them, and fake adding new stuff! Your playground awaits!</p>
      <Button onClick={() => navigate('/products')} variant="success"> 
        Go to Available Products
      </Button>
    </div>
  );
};

export default HomePage;