import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

const ProfilePage = () => {
    const { user } = useAuth(); // Access user data from context

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Text>
                                <strong>Email:</strong> {user.email} <br />
                                <strong>Epoints:</strong> {user.epoint} <br />
                                {/* Add more user details here */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
