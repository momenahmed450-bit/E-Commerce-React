import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Table, Button, Spinner, Card, Badge } from 'react-bootstrap';

const CartDetails = () => {
    const { id } = useParams(); 
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://dummyjson.com/carts/${id}`)
            .then(res => res.json())
            .then(data => {
                setCart(data);
                setLoading(false);
            })
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (loading) return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;

    return (
        <Container className="my-5">
            <Button variant="outline-secondary" onClick={() => navigate('/cart')} className="mb-4">
                ← العودة لجميع السلال
            </Button>

            <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white p-3">
                    <h4 className="mb-0">تفاصيل السلة رقم #{id}</h4>
                </Card.Header>
                <Card.Body>
                    <Table hover responsive className="text-center align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>اسم المنتج</th>
                                <th>السعر</th>
                                <th>الكمية</th>
                                <th>الإجمالي</th>
                                <th>الخصم</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.products.map(product => (
                                <tr key={product.id}>
                                    <td className="text-start fw-bold">{product.title}</td>
                                    <td>${product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.total}</td>
                                    <td className="text-success">{product.discountPercentage}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer className="bg-light p-3">
                    <div className="d-flex justify-content-between fw-bold">
                        <span>إجمالي المنتجات: {cart.totalProducts}</span>
                        <span className="text-primary">السعر النهائي بعد الخصم: ${cart.discountedTotal}</span>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default CartDetails;