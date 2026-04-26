import React, { useState } from 'react';
import { Container, Table, Button, Card, Spinner, Alert, Form, Row, Col, Badge } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const [searchUserId, setSearchUserId] = useState('');
    const [searchedCarts, setSearchedCarts] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);


    const handleSearchUserCarts = (e) => {
        e.preventDefault();
        if (!searchUserId) return;
        
        setSearchLoading(true);
        setSearchError(null);

        // جلب سلال مستخدم معين من DummyJSON
        fetch(`https://dummyjson.com/carts/user/${searchUserId}`)
            .then(res => {
                if (!res.ok) throw new Error("لم يتم العثور على مستخدم بهذا الرقم");
                return res.json();
            })
            .then(data => {
                if (data.carts && data.carts.length > 0) {
                    setSearchedCarts(data.carts);
                } else {
                    setSearchedCarts([]);
                    setSearchError("هذا المستخدم ليس لديه سلال سابقة.");
                }
                setSearchLoading(false);
            })
            .catch(err => {
                setSearchError(err.message);
                setSearchLoading(false);
                setSearchedCarts([]);
            });
    };

    const handleCheckout = () => {
        setLoading(true);
        setTimeout(() => {
            setOrderSuccess(true);
            setLoading(false);
            setTimeout(() => {
                clearCart();
                setOrderSuccess(false);
                navigate('/');
            }, 2000);
        }, 1500);
    };

    return (
        <Container className="my-5" dir="rtl">
            
            {/* قسم البحث - تم إصلاحه */}
            <section className="mb-5 p-4 bg-light rounded shadow-sm border">
                <h4 className="mb-3 fw-bold text-secondary text-end">🔍 سجلات الطلبات السابقة (بواسطة ID المستخدم)</h4>
                <Form onSubmit={handleSearchUserCarts}>
                    <Row className="align-items-end">
                        <Col md={8}>
                            <Form.Group className="text-end">
                                <Form.Label>أدخل معرف المستخدم (مثل: 1 أو 5)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="User ID" 
                                    value={searchUserId}
                                    onChange={(e) => setSearchUserId(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="d-grid mt-2 mt-md-0">
                            <Button variant="dark" type="submit" disabled={searchLoading}>
                                {searchLoading ? <Spinner size="sm" animation="border" /> : "بحث في السجلات"}
                            </Button>
                        </Col>
                    </Row>
                </Form>

                {searchError && <Alert variant="warning" className="mt-3 text-center">{searchError}</Alert>}

                {searchedCarts.length > 0 && (
                    <div className="mt-4">
                        <h6 className="text-end fw-bold mb-3">سلال الطلبات المكتشفة:</h6>
                        <Table striped bordered hover responsive size="sm" className="text-center">
                            <thead className="table-secondary">
                                <tr>
                                    <th>رقم الطلب</th>
                                    <th>عدد المنتجات</th>
                                    <th>الإجمالي النهائي</th>
                                    <th>عرض التفاصيل</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchedCarts.map(c => (
                                    <tr key={c.id}>
                                        <td>#{c.id}</td>
                                        <td>{c.totalProducts} منتجات</td>
                                        <td className="text-success fw-bold">${c.total}</td>
                                        <td>
                                            <Button variant="info" size="sm" onClick={() => navigate(`/cart/${c.id}`)}>
                                                👀 تفاصيل
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </section>

            <hr className="my-5" />

            <h2 className="mb-4 fw-bold text-center">سلة مشترياتك الحالية 🛒</h2>
            
            {orderSuccess && (
                <Alert variant="success" className="text-center">🎉 تم إتمام الشراء بنجاح!</Alert>
            )}

            {cartItems.length > 0 ? (
                <>
                    <Table hover responsive className="align-middle text-center shadow-sm border">
                        <thead className="table-dark">
                            <tr>
                                <th>المنتج</th>
                                <th>السعر</th>
                                <th>الكمية</th>
                                <th>الإجمالي</th>
                                <th>العمليات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td className="text-start fw-bold">{item.title}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <Button variant="outline-dark" size="sm" className="fw-bold" onClick={() => updateQuantity(item.id, 'dec')}>-</Button>
                                            <Badge bg="info" text="dark" className="px-3 py-2 fs-6">{item.quantity}</Badge>
                                            <Button variant="outline-dark" size="sm" className="fw-bold" onClick={() => updateQuantity(item.id, 'inc')}>+</Button>
                                        </div>
                                    </td>
                                    <td className="fw-bold text-primary">${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>حذف 🗑️</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Card className="mt-4 border-0 shadow bg-white p-3">
                        <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <h3 className="mb-3 mb-md-0 fw-bold">الإجمالي النهائي: <span className="text-success">${totalPrice.toFixed(2)}</span></h3>
                            <div className="d-flex gap-2">
                                <Button variant="outline-secondary" onClick={clearCart}>تفريغ السلة</Button>
                                <Button variant="success" size="lg" onClick={handleCheckout} disabled={loading}>
                                    {loading ? <Spinner size="sm" /> : "إتمام عملية الشراء ✅"}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </>
            ) : !orderSuccess && (
                <div className="text-center py-5 bg-light rounded shadow-sm border">
                    <h4 className="text-muted mb-3">السلة الحالية فارغة</h4>
                    <Button variant="primary" onClick={() => navigate('/product')}>تصفح المنتجات</Button>
                </div>
            )}
        </Container>
    );
};

export default Cart;