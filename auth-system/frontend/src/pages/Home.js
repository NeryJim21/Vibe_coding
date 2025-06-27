import React, { useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="home">
      {currentUser ? (
        <Card>
          <Card.Body>
            <Card.Title>Welcome, {currentUser.username}!</Card.Title>
            <Card.Text>
              You have successfully logged in to the authentication system.
            </Card.Text>
            <Card.Text>
              <small className="text-muted">User ID: {currentUser.id}</small>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">
          Please <Alert.Link href="/login">login</Alert.Link> or{' '}
          <Alert.Link href="/register">register</Alert.Link> to access the system.
        </Alert>
      )}
    </div>
  );
};

export default Home;