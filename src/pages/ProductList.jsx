import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container, Card, Button, Spinner } from 'react-bootstrap';
import { useCart } from '../context/CartContext'; 

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const [sortType, setSortType] = useState(''); 
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart(); 

    useEffect(() => {
        // جلب الفئات
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));

        fetchProducts();
    }, []);

    const fetchProducts = (category = '') => {
        setLoading(true);
        let url = 'https://dummyjson.com/products';
        if (category) {
            url = `https://dummyjson.com/products/category/${category}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        fetchProducts(category);
    };

    const processedProducts = products
        .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortType === 'price-asc') return a.price - b.price;
            if (sortType === 'price-desc') return b.price - a.price;
            if (sortType === 'rating') return b.rating - a.rating;
            return 0;
        });

    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <h2 className="mt-3">جاري تحميل المنتجات...</h2>
        </Container>
    );

    return (
        <Container>
            <h2 className="my-4 fw-bold text-center">متجرنا الإلكتروني</h2>

            <Row className="mb-4 g-3">
              
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="🔍 بحث عن منتج..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="shadow-sm"
                    />
                </Col>

               
                <Col md={4}>
                    <Form.Select 
                        value={selectedCategory} 
                        onChange={handleCategoryChange}
                        className="shadow-sm"
                    >
                        <option value="">كل الفئات</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.slug || cat}>
                                {cat.name || cat}
                            </option>
                        ))}
                    </Form.Select>
                </Col>

             
                <Col md={4}>
                    <Form.Select 
                        value={sortType} 
                        onChange={(e) => setSortType(e.target.value)}
                        className="shadow-sm"
                    >
                        <option value="">ترتيب حسب...</option>
                        <option value="price-asc">السعر: من الأقل للأعلى</option>
                        <option value="price-desc">السعر: من الأعلى للأقل</option>
                        <option value="rating">الأعلى تقييماً</option>
                    </Form.Select>
                </Col>
            </Row>

            <Row>
                {processedProducts.length > 0 ? (
                    processedProducts.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img 
                                    variant="top" 
                                    src={product.thumbnail} 
                                    style={{ height: '200px', objectFit: 'contain', padding: '10px' }} 
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fs-6 fw-bold h-50">{product.title}</Card.Title>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-primary fw-bold fs-5">${product.price}</span>
                                            <span className="text-muted small">⭐ {product.rating}</span>
                                        </div>
                                   
                                        <Button 
                                            variant="dark" 
                                            className="w-100 shadow-sm mt-2"
                                            onClick={() => addToCart(product)}
                                        >
                                            إضافة للسلة 🛒
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <h4>عذراً، لم يتم العثور على منتجات تطابق بحثك.</h4>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default ProductsList;