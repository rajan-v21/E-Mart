import React, { useContext, useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';

const ProfilePage = () => {
    const { loggedIn, userId, userName, userEmail, userType, userEpoint } = useContext(UserContext);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loggedIn) {
            const fetchInvoices = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/invoice/user/${userId}`);
                    setInvoices(response.data);
                } catch (error) {
                    console.error('Error fetching invoices:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchInvoices();
        } else {
            setLoading(false);
        }
    }, [loggedIn, userId]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!loggedIn) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card>
                        <Card.Header>User Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>{userName}</Card.Title>
                            <Card.Text style={{textAlign: 'left'}}>
                                <strong>UserId:</strong> {userId} <br />
                                <strong>Email:</strong> {userEmail} <br />
                                <strong>Epoints:</strong> {userEpoint} <br />
                                <strong>Membership:</strong> {userType > 0 ? 'Prime' : 'Regular'} <br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Header>Invoice History</Card.Header>
                        <Card.Body>
                            {invoices.length > 0 ? (
                                <ListGroup variant="flush">
                                    {invoices.map((invoice) => (
                                        <ListGroup.Item key={invoice.invoiceid}>
                                            <strong>InvoiceId:</strong> {invoice.invoiceid} <br />
                                            <strong>Date:</strong> {invoice.date} <br />
                                            <strong>Epoints Earned:</strong> {Math.round(invoice.tax)} <br />
                                            <strong>Total Amount:</strong> {invoice.totalamt} <br />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <p>No invoices found.</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
