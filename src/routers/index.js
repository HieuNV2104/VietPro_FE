import Home from '../pages/Home';
import Info from '../pages/Info';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
import Order from '../pages/Order';
import OrderDetail from '../pages/OrderDetail';
import Product from '../pages/Product';
import Search from '../pages/Search';
import Success from '../pages/Success';
import Register from '../pages/Register';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import AuthRequired from '../shared/AuthRequired';
import CheckNotLogged from '../shared/AuthRequired/CheckNotLogged';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: '/',
        element: Home
    },
    {
        path: '/info',
        element: CheckNotLogged(Info)
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
