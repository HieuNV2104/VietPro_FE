import Home from '../pages/Site/Home';
import Info from '../pages/Site/Info';
import Cart from '../pages/Site/Cart';
import Category from '../pages/Site/Category';
import Order from '../pages/Site/Order';
import OrderDetail from '../pages/Site/OrderDetail';
import Product from '../pages/Site/Product';
import Search from '../pages/Site/Search';
import Success from '../pages/Site/Success';
import Register from '../pages/Site/Register';
import Login from '../pages/Site/Login';
import NotFound from '../pages/Site/NotFound';
import AuthRequired from '../shared/Site/AuthRequired';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: '/',
        element: Home
    },
    {
        path: '/info',
        element: AuthRequired.CheckNotLogged(Info)
    },
    {
        path: '/category-:id',
        element: Category
    },
    {
        path: '/cart',
        element: Cart
    },
    {
        path: '/order',
        element: AuthRequired.CheckNotLogged(Order)
    },
    {
        path: '/order_detail-:id',
        element: AuthRequired.CheckNotLogged(OrderDetail)
    },
    {
        path: '/product-:id',
        element: Product
    },
    {
        path: '/search',
        element: Search
    },
    {
        path: '/success',
        element: AuthRequired.CheckNotLogged(Success)
    },
    {
        path: '/register',
        element: AuthRequired.CheckLogged(Register)
    },
    {
        path: '/login',
        element: AuthRequired.CheckLogged(Login)
    },
    {
        path: '*',
        element: NotFound
    }
];
