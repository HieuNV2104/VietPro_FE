import AuthRequired from '../shared/Admin/AuthRequired';
import Admin from '../pages/Admin/Admin';
import Login from '../pages/Admin/Login';
import Product from '../pages/Admin/products/Product';
import AddProduct from '../pages/Admin/products/AddProduct';
import EditProduct from '../pages/Admin/products/EditProduct';
import Category from '../pages/Admin/categories/Category';
import AddCategory from '../pages/Admin/categories/AddCategory';
import EditCategory from '../pages/Admin/categories/EditCategory';
import User from '../pages/Admin/users/User';
import AddUser from '../pages/Admin/users/AddUser';
import EditUser from '../pages/Admin/users/EditUser';
import Comment from '../pages/Admin/comments/Comment';
import Banner from '../pages/Admin/banners/Banner';
import AddBanner from '../pages/Admin/banners/AddBanner';
import EditBanner from '../pages/Admin/banners/EditBanner';
import Slide from '../pages/Admin/slides/Slide';
import AddSlide from '../pages/Admin/slides/AddSlide';
import EditSlide from '../pages/Admin/slides/EditSlide';
import Customer from '../pages/Admin/customers/Customer';
import Sale from '../pages/Admin/sales/Sale';
import AddSale from '../pages/Admin/sales/AddSale';
import EditSale from '../pages/Admin/sales/EditSale';
import Order from '../pages/Admin/orders/Order';
import OrderDetail from '../pages/Admin/orders/OrderDetail';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: '/dashboard',
        element: AuthRequired.CheckNotLogged(Admin)
    },
    {
        path: '/login',
        element: AuthRequired.CheckLogged(Login)
    },
    {
        path: '/products',
        element: AuthRequired.CheckNotLogged(Product)
    },
    {
        path: '/products/create',
        element: AuthRequired.CheckNotLogged(AddProduct)
    },
    {
        path: '/products-:id/edit',
        element: AuthRequired.CheckNotLogged(EditProduct)
    },
    {
        path: '/users',
        element: AuthRequired.CheckAdmin(User)
    },
    {
        path: '/users/create',
        element: AuthRequired.CheckAdmin(AddUser)
    },
    {
        path: '/users-:id/edit',
        element: AuthRequired.CheckAdmin(EditUser)
    },
    {
        path: '/categories',
        element: AuthRequired.CheckNotLogged(Category)
    },
    {
        path: '/categories/create',
        element: AuthRequired.CheckNotLogged(AddCategory)
    },
    {
        path: '/categories-:id/edit',
        element: AuthRequired.CheckNotLogged(EditCategory)
    },
    {
        path: '/comments',
        element: AuthRequired.CheckNotLogged(Comment)
    },
    {
        path: '/ads/banners',
        element: AuthRequired.CheckNotLogged(Banner)
    },
    {
        path: '/ads/banners/create',
        element: AuthRequired.CheckNotLogged(AddBanner)
    },
    {
        path: '/ads/banners-:id/edit',
        element: AuthRequired.CheckNotLogged(EditBanner)
    },
    {
        path: '/ads/slides',
        element: AuthRequired.CheckNotLogged(Slide)
    },
    {
        path: '/ads/slides/create',
        element: AuthRequired.CheckNotLogged(AddSlide)
    },
    {
        path: '/ads/slides-:id/edit',
        element: AuthRequired.CheckNotLogged(EditSlide)
    },
    {
        path: '/customers',
        element: AuthRequired.CheckNotLogged(Customer)
    },
    {
        path: '/sales',
        element: AuthRequired.CheckNotLogged(Sale)
    },
    {
        path: '/sales/create',
        element: AuthRequired.CheckNotLogged(AddSale)
    },
    {
        path: '/sales-:id/edit',
        element: AuthRequired.CheckNotLogged(EditSale)
    },
    {
        path: '/orders',
        element: AuthRequired.CheckNotLogged(Order)
    },
    {
        path: '/orders-:id',
        element: AuthRequired.CheckNotLogged(OrderDetail)
    }
];
