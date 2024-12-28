import { BASE_URL } from '../constants/app';
import moment from 'moment';

// get Image Product
export const getImageProduct = (imageName) => {
    return `${BASE_URL}/assets/uploads/products/${imageName}`;
};

// get Image Slider
export const getImageSlider = (imageName) => {
    return `${BASE_URL}/assets/uploads/sliders/${imageName}`;
};

// get Image Banner
export const getImageBanner = (imageName) => {
    return `${BASE_URL}/assets/uploads/banners/${imageName}`;
};

// format price
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

// format date
export const formatDate = (date) => {
    const m = moment(date).format('DD/MM/YYYY HH:mm:ss');
    return m;
};
