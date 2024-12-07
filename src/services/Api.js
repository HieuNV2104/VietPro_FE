import Http from './Http';
// API Products
export const getProducts = (config) => {
    return Http.get('/products', config);
};
// API Categories
export const getCategories = (config) => {
    return Http.get('/categories', config);
};
//  API Category
export const getCategory = (id, config) => {
    return Http.get(`/categories/${id}`, config);
};
//  API Products By Category
export const getProductsByCategory = (id, config) => {
    return Http.get(`/categories/${id}/products`, config);
};
// API Product
export const getProduct = (id, config) => {
    return Http.get(`/products/${id}`, config);
};
// API Comments By Product
export const getCommentsByProduct = (id, config) => {
    return Http.get(`/products/${id}/comments`, config);
};
// API Send Comment
export const createComment = (id, data) => {
    return Http.post(`/products/${id}/comments`, data);
};
// API Order
export const order = (data) => {
    return Http.post('/order', data);
};
// API Slider
export const getSlider = (config) => {
    return Http.get('/sliders', config);
};
// API Banner
export const getBanner = (config) => {
    return Http.get('/banners', config);
};
// API Register
export const registerCustomer = (data) => {
    return Http.post('/customers/register', data);
};
// API Login
export const loginCustomer = (data) => {
    return Http.post('/customers/login', data);
};
// API Logout
export const logoutCustomer = (id) => {
    return Http.get(`/customers/${id}/logout`);
};
// API Order List
export const orderList = (id) => {
    return Http.get(`/customers/${id}/orders`);
};
// API Order Detail
export const orderDetail = (id) => {
    return Http.get(`/customer/orders/${id}`);
};
// API Cancel Order
export const cancelOrder = (id) => {
    return Http.get(`/customer/orders/${id}/canceled`);
};
// API Update Customer
export const updateCustomer = (id, data) => {
    return Http.post(`/customers/${id}/update`, data);
};
// API Refresh Token
export const refreshToken = () => {
    return Http.get('/customer/refreshtoken');
};
