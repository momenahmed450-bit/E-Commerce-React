import React, { useState } from 'react';

import ProductsList from '../products/ProductsList';
import CartsList from '../carts/CartsList';
import UsersList from '../users/UsersList';

const Dashboard = () => {
   
    const [activeTab, setActiveTab] = useState('products');

  
    const renderContent = () => {
        switch (activeTab) {
            case 'products':
                return <ProductsList />;
            case 'carts':
                return <CartsList />;
            case 'users':
                return <UsersList />;
            default:
                return <ProductsList />;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar - القائمة الجانبية */}
            <div style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px'
            }}>
                <h3>لوحة التحكم الشاملة</h3>
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
                    <li 
                        onClick={() => setActiveTab('products')}
                        style={tabStyle(activeTab === 'products')}>
                        إدارة المنتجات
                    </li>
                    <li 
                        onClick={() => setActiveTab('carts')}
                        style={tabStyle(activeTab === 'carts')}>
                        إدارة السلال
                    </li>
                    <li 
                        onClick={() => setActiveTab('users')}
                        style={tabStyle(activeTab === 'users')}>
                        إدارة المستخدمين
                    </li>
                </ul>
            </div>

           
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f7f6' }}>
                <header style={{ marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>
                    <h2>القسم الحالي: {activeTab.toUpperCase()}</h2>
                </header>
                
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


const tabStyle = (isActive) => ({
    padding: '15px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#34495e' : 'transparent',
    borderLeft: isActive ? '4px solid #3498db' : 'none',
    marginBottom: '10px',
    transition: '0.3s'
});

export default Dashboard;