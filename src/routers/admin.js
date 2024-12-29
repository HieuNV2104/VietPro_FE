import Admin from '../pages/Admin/Admin';
import Login from '../pages/Admin/Login';
import Product from '../pages/Admin/products/Product';
import Category from '../pages/Admin/categories/Category';
import User from '../pages/Admin/users/User';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: '/dashboard',
        element: Admin
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/products',
        element: Product
    },
    {
        path: '/users',
        element: User
    },
    {
        path: '/categories',
        element: Category
    }
];
