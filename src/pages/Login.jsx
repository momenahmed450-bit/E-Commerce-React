import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        
        
        if (credentials.username === 'admin_momen' && credentials.password === '123456') {
            const adminData = {
                id: 999,
                username: 'admin_momen',
                firstName: 'Momen',
                role: 'admin',
                token: 'fake-admin-token-123' 
            };
            login(adminData);
            navigate('/Dashboard');
            return;
        }

        if (credentials.username === 'user_momen' && credentials.password === '123456') {
            const userData = {
                id: 888,
                username: 'user_momen',
                firstName: 'Momen User',
                role: 'user',
                token: 'fake-user-token-456' 
            };
            login(userData);
            navigate('/'); 
            return;
        }
      

      
        try {
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            const data = await res.json();

            if (res.ok) {
                login(data);
                navigate('/Dashboard');
            } else {
                setError("اسم المستخدم أو كلمة المرور غير صحيحة");
            }
        } catch (err) {
            setError("حدث خطأ في الاتصال بالسيرفر");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow border-0" style={{ width: '400px' }}>
                <Card.Body className="p-4">
                    <h3 className="text-center mb-3 fw-bold">تسجيل الدخول</h3>
                    <p className="text-center text-muted small mb-4">استخدم حساب الإدارة أو حساب المستخدم</p>
                    
                    {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}
                    
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="أدخل اسم المستخدم" 
                                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="أدخل كلمة المرور" 
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
                            {loading ? <Spinner size="sm" animation="border" /> : 'دخول'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;