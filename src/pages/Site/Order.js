import { Link } from 'react-router-dom';
import { orderList, cancelOrder } from '../../services/Api';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { formatDate, formatPrice } from '../../shared/ultils';

const Order = () => {
    // id order
    const [idOrder, setIdOrder] = useState('');
    // orderList
    const [orders, setOders] = useState([]);
    // login
    const login = useSelector(({ authReducer }) => authReducer.login);

    // cancel order
    const handleCancelOrder = (id) => {
        const confirm = window.confirm('Bạn có muốn hủy đơn hàng này không ?');
        if (confirm) {
            cancelOrder(id)
                .then(() => setIdOrder(id))
                .catch((error) => console.log(error));
        } else {
            return false;
        }
    };

    useEffect(() => {
        orderList(login?.currentCustomer?._id)
            .then(({ data }) => setOders(data.data.docs))
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idOrder]);

    return (
        <div id="my-cart">
            <div className="row">
                <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                    Đơn hàng của bạn
                </div>
                <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">
                    Tổng tiền
                </div>
            </div>
            <form method="post">
                {orders?.map((order, index) => {
                    let alert = '';
                    if (order.status === 0) {
                        alert = 'alert-danger';
                    }
                    if (order.status === 2) {
                        alert = 'alert-success';
                    }
                    return (
                        <div key={index} className={`cart-item row ${alert}`}>
                            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                <h4>
                                    Đơn hàng đã mua vào ngày:{' '}
                                    <span className="text-secondary">
                                        {formatDate(order.createdAt)}
                                    </span>
                                </h4>
                                <p>Mã Đơn (MĐ): {order._id}</p>
                            </div>
                            <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                                <b>{formatPrice(order.totalPrice)}</b>
                            </div>
                            <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                                <Link
                                    className="btn btn-outline-dark mb-1"
                                    to={`/order_detail-${order._id}`}
                                >
                                    Chi tiết đơn hàng
                                </Link>
                                {order.status === 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger mb-1"
                                    >
                                        Đơn đã huỷ
                                    </button>
                                )}
                                {order.status === 1 && (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger mb-1"
                                            onClick={() =>
                                                handleCancelOrder(order._id)
                                            }
                                        >
                                            Huỷ đơn
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-success mb-1"
                                        >
                                            Đơn đang giao
                                        </button>
                                    </>
                                )}
                                {order.status === 2 && (
                                    <button
                                        type="button"
                                        className="btn btn-success mb-1"
                                    >
                                        Đơn đã giao
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className="row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                        <Link
                            id="update-cart"
                            className="btn btn-success"
                            type="submit"
                            name="sbm"
                            to={'/'}
                        >
                            Quay về trang chủ
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Order;
