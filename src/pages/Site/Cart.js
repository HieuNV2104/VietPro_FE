import { useSelector, useDispatch } from 'react-redux';
import { getImageProduct } from '../../shared/ultils';
import {
    updateCart,
    deleteItemCart
} from '../../redux-setup/reducers/cartReducer';
import { order } from '../../services/Api';
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../shared/ultils';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // login
    const login = useSelector(({ authReducer }) => authReducer.login);
    // items cart
    const items = useSelector(({ cartReducer }) => cartReducer.cartItems);
    const newItems = items?.map((item, index) => {
        return {
            prd_id: item._id,
            price: item.price,
            qty: item.qty
        };
    });
    // update qty
    const handleChangeQuantity = (e, _id) => {
        dispatch(
            updateCart({
                _id,
                qty: e.target.value
            })
        );
    };

    // delete item
    const handleDelete = (e, _id) => {
        e.preventDefault();
        const isConfirm = window.confirm(
            'Bạn có muốn xóa sản phẩm khỏi giỏ hàng không ?'
        );
        if (isConfirm) {
            return dispatch(
                deleteItemCart({
                    _id
                })
            );
        } else {
            return false;
        }
    };

    // order
    const handleOrder = (e) => {
        e.preventDefault();
        const { _id, fullName, email, phone, address } = login.currentCustomer;
        order({
            fullName,
            email,
            phone,
            address,
            customer_id: _id,
            items: newItems
        })
            .then(() => navigate('/success'))
            .catch((error) => console.log(error));
    };

    // total price
    const totalPrice = items?.reduce((total, item) => {
        return (total += item.qty * item.price);
    }, 0);

    return (
        <>
            <div>
                <div id="my-cart">
                    <div className="row">
                        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                            Thông tin sản phẩm
                        </div>
                        <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                            Tùy chọn
                        </div>
                        <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">
                            Giá
                        </div>
                    </div>
                    <form method="post">
                        {items?.map((item, index) => {
                            return (
                                <div key={item._id} className="cart-item row">
                                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                        <img
                                            src={getImageProduct(item.image)}
                                            alt="img"
                                        />
                                        <h4>{item.name}</h4>
                                    </div>
                                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                        <input
                                            onChange={(e) =>
                                                handleChangeQuantity(
                                                    e,
                                                    item._id
                                                )
                                            }
                                            type="number"
                                            id="quantity"
                                            className="form-control form-blue quantity"
                                            value={item.qty}
                                        />
                                    </div>
                                    <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                                        <b>
                                            {formatPrice(item.price * item.qty)}
                                        </b>
                                        <Link
                                            onClick={(e) =>
                                                handleDelete(e, item._id)
                                            }
                                            href="#"
                                        >
                                            Xóa
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="row">
                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12" />
                            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                                <b>Tổng cộng:</b>
                            </div>
                            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                                <b>{formatPrice(totalPrice)}</b>
                            </div>
                        </div>
                    </form>
                </div>
                <div id="customer">
                    <div className="row">
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            {login.loggedIn ? (
                                <Link onClick={(e) => handleOrder(e)}>
                                    <b>Mua ngay</b>
                                    <span>Giao hàng tận nơi siêu tốc</span>
                                </Link>
                            ) : (
                                <Link to={'/login'}>
                                    <b>Đăng nhập</b>
                                    <span>Đăng nhập để mua hàng</span>
                                </Link>
                            )}
                        </div>
                        <div className="by-now col-lg-6 col-md-6 col-sm-12">
                            <Link>
                                <b>Trả góp Online</b>
                                <span>Vui lòng call (+84) 0988 550 553</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
