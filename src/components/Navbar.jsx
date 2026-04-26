import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import { Badge, Container, Nav, Navbar as BootstrapNavbar, Button } from 'react-bootstrap';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems, clearCart } = useCart(); 
  const navigate = useNavigate();

 
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

 
  const handleLogout = () => {
    clearCart(); 
    logout();    
    navigate('/login'); 
  };

  return (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary shadow-sm mb-4">
      <Container fluid>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold">
          MY STORE
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
        
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/product">Products</Nav.Link>
            
            {user?.role === 'admin' && (
              <Nav.Link as={Link} to="/Dashboard" className="text-primary fw-bold">
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          <Nav className="align-items-center gap-3">
            
            <Nav.Link as={Link} to="/cart" className="position-relative p-2">
              <span style={{ fontSize: '1.2rem' }}>Cart 🛒</span>
              {totalItems > 0 && (
                <Badge 
                  pill 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/Register">
                  <Button variant="outline-primary" size="sm">Register</Button>
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span className="small text-muted d-none d-md-inline">
                  Welcome, <strong>{user.username}</strong>
                </span>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
