import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <h3>Sign In</h3>
      {error && <Alert variant="danger">{error}</Alert>}
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
        Submit
      </Button>
      <p className="forgot-password text-right">
        New user? <a href="/register">Register here</a>
      </p>
    </Form>
  );
};

export default Login;