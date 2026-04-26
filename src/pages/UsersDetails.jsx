import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Image, ListGroup, Badge, Spinner } from 'react-bootstrap';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // جلب بيانات المستخدم من DummyJSON
        fetch(`https://dummyjson.com/users/${id}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <h2 className="mt-3">جاري تحميل بيانات المستخدم...</h2>
            </Container>
        );
    }

    if (!user || user.message) {
        return (
            <Container className="text-center mt-5">
                <h2>المستخدم غير موجود!</h2>
                <Button variant="primary" onClick={() => navigate('/users')}>العودة لقائمة المستخدمين</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                ← العودة للخلف
            </Button>

            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="shadow-lg border-0">
                     
                        <Card.Header className="bg-primary text-white text-center py-5 position-relative">
                            <Image 
                                src={user.image} 
                                roundedCircle 
                                className="border border-4 border-white shadow position-absolute top-100 start-50 translate-middle"
                                style={{ width: '120px', height: '120px', backgroundColor: 'white' }}
                            />
                        </Card.Header>
                        
                        <Card.Body className="mt-5 pt-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">{user.firstName} {user.lastName}</h2>
                                <p className="text-muted">@{user.username} | {user.company?.title}</p>
                                <Badge bg="success" pill>{user.role || 'User'}</Badge>
                            </div>

                            <Row className="g-4">
                              
                                <Col md={6}>
                                    <h5 className="border-bottom pb-2 fw-bold">المعلومات الشخصية</h5>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>البريد:</strong> {user.email}</ListGroup.Item>
                                        <ListGroup.Item><strong>الهاتف:</strong> {user.phone}</ListGroup.Item>
                                        <ListGroup.Item><strong>الجنس:</strong> {user.gender === 'male' ? 'ذكر' : 'أنثى'}</ListGroup.Item>
                                        <ListGroup.Item><strong>تاريخ الميلاد:</strong> {user.birthDate}</ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                
                                <Col md={6}>
                                    <h5 className="border-bottom pb-2 fw-bold">العنوان والعمل</h5>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item><strong>المدينة:</strong> {user.address?.city}</ListGroup.Item>
                                        <ListGroup.Item><strong>الشارع:</strong> {user.address?.address}</ListGroup.Item>
                                        <ListGroup.Item><strong>الشركة:</strong> {user.company?.name}</ListGroup.Item>
                                        <ListGroup.Item><strong>الجامعة:</strong> {user.university}</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>

                            <div className="text-center mt-4 pt-3 border-top">
                                <Button variant="primary" className="px-4 me-2">تعديل البيانات</Button>
                                <Button variant="danger" className="px-4">حذف الحساب</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDetails;