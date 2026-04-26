import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        brand: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            fetch(`https://dummyjson.com/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        title: data.title,
                        price: data.price,
                        category: data.category,
                        description: data.description,
                        brand: data.brand || ''
                    });
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', msg: '' });

        const url = isEditMode 
            ? `https://dummyjson.com/products/${id}` 
            : 'https://dummyjson.com/products/add';
        
        const method = isEditMode ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus({ 
                    type: 'success', 
                    msg: isEditMode ? 'تم تحديث المنتج بنجاح!' : 'تم إضافة المنتج بنجاح!' 
                });
                console.log("Response from API:", data);
               
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (error) {
            setStatus({ type: 'danger', msg: 'حدث خطأ أثناء العملية، حاول مرة أخرى.' });
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow border-0">
                        <Card.Header className={isEditMode ? "bg-warning text-dark py-3" : "bg-success text-white py-3"}>
                            <h4 className="mb-0 text-center">
                                {isEditMode ? `تعديل المنتج #${id}` : 'إضافة منتج جديد'}
                            </h4>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}
                            
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">اسم المنتج</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                placeholder="أدخل اسم المنتج"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">السعر ($)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                                placeholder="0.00"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">الفئة (Category)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                required
                                                placeholder="مثلاً: electronics"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">العلامة التجارية</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleChange}
                                                placeholder="Brand name"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">وصف المنتج</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        rows={4}
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        placeholder="اكتب وصفاً تفصيلياً للمنتج..."
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant={isEditMode ? "warning" : "success"} size="lg" type="submit" disabled={loading}>
                                        {loading ? <Spinner size="sm" animation="border" /> : (isEditMode ? 'تحديث البيانات' : 'حفظ المنتج')}
                                    </Button>
                                    <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                                        إلغاء
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductForm;