import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Spinner } from 'react-bootstrap';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ title: '', price: '' });

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=10')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    }, []);

    
    const handleShowAdd = () => {
        setEditMode(false);
        setCurrentProduct({ title: '', price: '' });
        setShowModal(true);
    };

   
    const handleShowEdit = (product) => {
        setEditMode(true);
        setCurrentProduct(product);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleSave = (e) => {
        e.preventDefault();
        if (editMode) {
           
            setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
        } else {
           
            const newProduct = { ...currentProduct, id: Date.now() };
            setProducts([newProduct, ...products]);
        }
        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    if (loading) return <div className="text-center my-5"><Spinner animation="border" /></div>;

    return (
        <Container className="my-5" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">لوحة التحكم</h2>
              
                <Button variant="dark" onClick={handleShowAdd}>
                    إضافة منتج جديد +
                </Button>
            </div>

            <Table hover responsive className="align-middle text-center border shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th className="text-end px-4">العنوان</th>
                        <th>السعر</th>
                        <th>العمليات</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td className="text-end px-4">{product.title}</td>
                            <td>${product.price}</td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                   
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        حذف
                                    </Button>
                                  
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        onClick={() => handleShowEdit(product)}
                                    >
                                        تعديل
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

           
            <Modal show={showModal} onHide={handleClose} centered dir="rtl">
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>{editMode ? 'تعديل المنتج' : 'إضافة منتج جديد'}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSave}>
                    <Modal.Body>
                        <Form.Group className="mb-3 text-end">
                            <Form.Label>اسم المنتج</Form.Label>
                            <Form.Control 
                                type="text" 
                                required
                                value={currentProduct.title}
                                onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 text-end">
                            <Form.Label>السعر ($)</Form.Label>
                            <Form.Control 
                                type="number" 
                                required
                                value={currentProduct.price}
                                onChange={(e) => setCurrentProduct({...currentProduct, price: e.target.value})}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="justify-content-start">
                        <Button variant="secondary" onClick={handleClose}>إلغاء</Button>
                        <Button variant="primary" type="submit">
                            {editMode ? 'تحديث البيانات' : 'حفظ المنتج'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Dashboard;