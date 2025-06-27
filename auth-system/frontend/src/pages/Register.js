import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      await AuthService.register(username, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      <h3>Sign Up</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Register
      </Button>
      <p className="forgot-password text-right">
        Already registered? <a href="/login">Sign in</a>
      </p>
    </Form>
  );
};

export default Register;