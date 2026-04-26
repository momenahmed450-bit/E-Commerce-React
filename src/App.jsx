import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'  
import About from './pages/About'
import Login from './pages/Login'
import Cart from './pages/cart'
import Product from './pages/ProductList';
import Register from './pages/Register'
import Dashboard from './pages/Dashboard';
import Error from './pages/Error'
import Footer from './components/Footer'
import ProtectedRoute from './components/Protected'
import CartDetails from './pages/CartDetails';



import { AuthProvider } from './context/AuthContext' 
import { CartProvider } from './context/CartContext' 

function App() {
  return (

    <AuthProvider>
     
      <CartProvider>
        
        <Navbar />
        
        <Routes>
       
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register/>}/>
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path="/cart/:id" element={<CartDetails />} />

          <Route path='/Dashboard' element={ 
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

         
          <Route path='/*' element={<Error/>}/>
        </Routes>
        
        <Footer/>

      </CartProvider>
    </AuthProvider>
  )
}

export default App;
