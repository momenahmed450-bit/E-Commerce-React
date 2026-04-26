import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Badge, Spinner, Card } from 'react-bootstrap';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product details:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <h2 className="mt-3">جاري تحميل تفاصيل المنتج...</h2>
            </Container>
        );
    }

    if (!product || product.message) {
        return (
            <Container className="text-center mt-5">
                <h2>المنتج غير موجود!</h2>
                <Button variant="primary" onClick={() => navigate(-1)}>العودة للمنتجات</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
                ← العودة إلى القائمة
            </Button>
            
            <Row className="shadow-sm p-4 bg-white rounded border">
                {/* قسم الصورة */}
                <Col lg={5} className="text-center mb-4 mb-lg-0">
                    <Image 
                        src={product.thumbnail} 
                        alt={product.title} 
                        fluid 
                        rounded 
                        style={{ maxHeight: '400px', objectFit: 'contain' }} 
                    />
                    <div className="mt-3 d-flex justify-content-center gap-2">
                        {product.images?.slice(0, 3).map((img, index) => (
                            <Image key={index} src={img} width="60" className="border rounded p-1" />
                        ))}
                    </div>
                </Col>

              
                <Col lg={7}>
                    <div className="ps-lg-4">
                        <Badge bg="info" className="mb-2 text-capitalize">{product.category}</Badge>
                        <h2 className="fw-bold mb-3">{product.title}</h2>
                        
                        <div className="d-flex align-items-center mb-3">
                            <span className="text-warning fs-5 me-2">⭐ {product.rating}</span>
                            <span className="text-muted small">({product.stock} قطعة متوفرة)</span>
                        </div>

                        <h3 className="text-primary mb-4 fw-bold">${product.price}</h3>
                        
                        <Card className="bg-light border-0 mb-4">
                            <Card.Body>
                                <Card.Title className="fs-6 fw-bold">وصف المنتج</Card.Title>
                                <Card.Text className="text-muted">
                                    {product.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" className="py-3 fw-bold">
                                إضافة إلى العربة
                            </Button>
                            <Button variant="outline-dark" size="lg">
                                شراء الآن
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;