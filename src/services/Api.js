import Http from './Http';

// API SITE
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
export const getSlides = (config) => {
    return Http.get('/slides', config);
};
// API Banner
export const getBanners = (config) => {
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
export const logoutCustomer = () => {
    return Http.post('/customers/logout');
};
// API Order List
export const orderList = (id) => {
    return Http.get(`/customers/${id}/orders`);
};
// API Order Detail
export const orderDetail = (id) => {
    return Http.get(`/customers/orders/${id}`);
};
// API Cancel Order
export const cancelOrder = (id) => {
    return Http.patch(`/orders/${id}/cancel`);
};
// API Update Customer
export const updateCustomer = (id, data) => {
    return Http.post(`/customers/${id}/update`, data);
};
// API Refresh Token Customer
export const refreshTokenCustomer = () => {
    return Http.get('/customer/refreshToken');
};

/////////////////////////////////////////////////
// API ADMIN
// API Get Products
export const getAdminProducts = (config) => {
    return Http.get('/admin/products', config);
};
// API Product Detail
export const getAdminProduct = (id) => {
    return Http.get(`/admin/products/${id}`);
};
// API Create Product
export const createProduct = (data) => {
    return Http.post('/admin/products/create', data);
};
// API update Product
export const updateProduct = (id, data) => {
    return Http.post(`/admin/products/${id}/update`, data);
};
// API Delete Product
export const deleteProduct = (id) => {
    return Http.get(`/admin/products/${id}/delete`);
};
// API Get Categories
export const getAdminCategories = (config) => {
    return Http.get('/admin/categories', config);
};
// API Get Category
export const getAdminCategory = (id) => {
    return Http.get(`/admin/categories/${id}`);
};
// API Create Category
export const createCategory = (data) => {
    return Http.post('/admin/categories/create', data);
};
// API Update Category
export const updateCategory = (id, data) => {
    return Http.post(`/admin/categories/${id}/update`, data);
};
// API Delete Category
export const deleteCategory = (id) => {
    return Http.get(`/admin/categories/${id}/delete`);
};
// API Users
export const getUsers = (config) => {
    return Http.get('/admin/users', config);
};
// API User
export const getUser = (id, config) => {
    return Http.get(`/admin/users/${id}`, config);
};
// API Create User
export const createUser = (data) => {
    return Http.post('/admin/users/create', data);
};
// API Update User
export const updateUser = (id, data) => {
    return Http.post(`/admin/users/${id}/update`, data);
};
// API Delete User
export const deleteUser = (id) => {
    return Http.get(`/admin/users/${id}/delete`);
};
// API Customers
export const getCustomers = (config) => {
    return Http.get('/admin/customers', config);
};
// API Delete Customer
export const deleteCustomer = (id) => {
    return Http.get(`/admin/customers/${id}/delete`);
};
// API Comments
export const getComments = (config) => {
    return Http.get('/admin/comments', config);
};
// API Delete Comment
export const deleteComment = (id) => {
    return Http.get(`/admin/comments/${id}/delete`);
};
// API Hide Comment
export const hideComment = (id) => {
    return Http.patch(`/admin/commnets/${id}/hide`);
};
// API Show Comment
export const showComment = (id) => {
    return Http.patch(`/admin/commnets/${id}/show`);
};
// API Admin Banners
export const getAdminBanners = (config) => {
    return Http.get('/admin/banners', config);
};
// API Get Banner
export const getBanner = (id, config) => {
    return Http.get(`/admin/banners/${id}`, config);
};
// API Create Banner
export const createBanner = (data) => {
    return Http.post('/admin/banners/create', data);
};
// API update Banner
export const updateBanner = (id, data) => {
    return Http.post(`/admin/banners/${id}/update`, data);
};
// API Delete Banner
export const deleteBanner = (id) => {
    return Http.get(`/admin/banners/${id}/delete`);
};
// API Hide Banner
export const hideBanner = (id) => {
    return Http.patch(`/admin/banners/${id}/hide`);
};
// API Show Banner
export const showBanner = (id) => {
    return Http.patch(`/admin/banners/${id}/show`);
};
// API Admin Slides
export const getAdminSlides = (config) => {
    return Http.get('/admin/slides', config);
};
// API Get Slide
export const getSlide = (id, config) => {
    return Http.get(`/admin/slides/${id}`, config);
};
// API Create Slide
export const createSlide = (data) => {
    return Http.post('/admin/slides/create', data);
};
// API update Slide
export const updateSlide = (id, data) => {
    return Http.post(`/admin/slides/${id}/update`, data);
};
// API Delete Slide
export const deleteSlide = (id) => {
    return Http.get(`/admin/slides/${id}/delete`);
};
// API Hide Slide
export const hideSlide = (id) => {
    return Http.patch(`/admin/slides/${id}/hide`);
};
// API Show Slide
export const showSlide = (id) => {
    return Http.patch(`/admin/slides/${id}/show`);
};
// API Sales
export const getSales = (config) => {
    return Http.get('/admin/sales', config);
};
// API Get Sale
export const getSale = (id, config) => {
    return Http.get(`/admin/sales/${id}`, config);
};
// API Create Sale
export const createSale = (data) => {
    return Http.post('/admin/sales/create', data);
};
// API update Sale
export const updateSale = (id, data) => {
    return Http.post(`/admin/sales/${id}/update`, data);
};
// API Delete Sale
export const deleteSale = (id) => {
    return Http.get(`/admin/sales/${id}/delete`);
};
// API Admin Orders
export const getOrders = (config) => {
    return Http.get('/admin/orders', config);
};
// API Admin Orders
export const getOrderDetail = (id) => {
    return Http.get(`/admin/orders/${id}`);
};
// API Confirm Order
export const confirmOrder = (id) => {
    return Http.patch(`/admin/orders/${id}/confirm`);
};
// API Delivered Order
export const deliveredOrder = (id) => {
    return Http.patch(`/admin/orders/${id}/delivered`);
};
// API Done Order
export const doneOrder = (id) => {
    return Http.patch(`/admin/orders/${id}/done`);
};
// API Login User
export const loginUser = (data) => {
    return Http.post('/admin/login', data);
};
// API Logout User
export const logoutUser = () => {
    return Http.post('/admin/logout');
};
// API Refresh Token User
export const refreshTokenUser = () => {
    return Http.get('/admin/refreshToken');
};
