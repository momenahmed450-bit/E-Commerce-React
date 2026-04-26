import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button, Spinner, InputGroup, Badge, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, []);

   
    const filteredUsers = users.filter(user => 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <h2 className="mt-3">جاري تحميل قائمة المستخدمين...</h2>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">إدارة المستخدمين (Users Module)</h2>
                <Badge bg="dark" pill>{filteredUsers.length} مستخدم</Badge>
            </div>

            
            <InputGroup className="mb-4 shadow-sm">
                <InputGroup.Text bg="light">🔍</InputGroup.Text>
                <Form.Control
                    placeholder="ابحث عن طريق الاسم أو البريد الإلكتروني..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </InputGroup>

            
            <div className="table-responsive shadow-sm rounded border">
                <Table hover striped className="align-middle mb-0 text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>الصورة</th>
                            <th>الاسم الكامل</th>
                            <th>البريد الإلكتروني</th>
                            <th>العمر</th>
                            <th>الجنس</th>
                            <th>العمليات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>
                                        <Image 
                                            src={user.image} 
                                            roundedCircle 
                                            width="40" 
                                            height="40" 
                                            className="border shadow-sm"
                                        />
                                    </td>
                                    <td className="fw-bold">{user.firstName} {user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                        <Badge bg={user.gender === 'male' ? 'info' : 'danger'}>
                                            {user.gender === 'male' ? 'ذكر' : 'أنثى'}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            onClick={() => navigate(`/users/${user.id}`)}
                                        >
                                            التفاصيل
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-4 text-muted">لا يوجد مستخدمين مطابقين للبحث</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* الترقيم (Pagination) */}
            <div className="mt-4 d-flex justify-content-center gap-2">
                <Button variant="outline-dark" size="sm" disabled>السابق</Button>
                <Button variant="primary" size="sm">1</Button>
                <Button variant="outline-dark" size="sm">2</Button>
                <Button variant="outline-dark" size="sm">التالي</Button>
            </div>
        </Container>
    );
};

export default UsersList;