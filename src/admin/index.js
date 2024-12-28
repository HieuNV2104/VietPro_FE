import Admin from '../pages/Admin/Admin';
import Login from '../pages/Admin/Login';
import Product from '../pages/Admin/products/Product';
import User from '../pages/Admin/users/User';
import Category from '../pages/Admin/categories/Category';
import { Routes, Route } from 'react-router-dom';

const AdminApp = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Product />} />
                <Route path="/users" element={<User />} />
                <Route path="/categories" element={<Category />} />
            </Routes>
        </>
    );
};

export default AdminApp;
