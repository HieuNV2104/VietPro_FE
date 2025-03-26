import { Link } from 'react-router-dom';
import { orderList, cancelOrder } from '../../services/Api';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { formatDate, formatPrice } from '../../shared/ultils';
import Pagination from '../../shared/Site/components/Pagination';

const Order = () => {
    // id order
    const [idOrder, setIdOrder] = useState('');
    // orderList
    const [orders, setOders] = useState([]);
    const [pages, setPages] = useState([]);
    // login
    const login = useSelector(({ customerReducer }) => customerReducer.login);

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
            .then(({ data }) => {
                setOders(data.data.docs);
                setPages(data.data.pages);
            })
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
                    if (order.status === 'waiting') {
                        alert = 'alert-warning';
                    }
                    if (order.status === 'shipping') {
                        alert = 'alert-primary';
                    }
                    if (order.status === 'cancelled') {
                        alert = 'alert-danger';
                    }
                    if (
                        order.status === 'delivered' ||
                        order.status === 'done'
                    ) {
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
                                <p style={{ marginBottom: 6.5 }}>
                                    Mã Đơn (MĐ): {order._id}
                                </p>
                                <p style={{ margin: 0 }}>
                                    Thanh toán:{' '}
                                    {order.is_paid ? (
                                        <span style={{ color: 'green' }}>
                                            Đã thanh toán
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            Chưa thanh toán
                                        </span>
                                    )}
                                </p>
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
                                {order.status === 'cancelled' && (
                                    <button
                                        type="button"
                                        className="btn btn-danger mb-1"
                                    >
                                        Đơn đã huỷ
                                    </button>
                                )}
                                {(order.status === 'delivered' ||
                                    order.status === 'done') && (
                                    <button
                                        type="button"
                                        className="btn btn-success mb-1"
                                    >
                                        Đơn đã giao
                                    </button>
                                )}
                                {order.status === 'waiting' && (
                                    <button
                                        type="button"
                                        className="btn btn-warning mb-1"
                                    >
                                        Đơn chờ duyệt
                                    </button>
                                )}
                                {order.status === 'shipping' && (
                                    <button
                                        type="button"
                                        className="btn btn-primary mb-1"
                                    >
                                        Đơn đang giao
                                    </button>
                                )}
                                {(order.status === 'shipping' ||
                                    order.status === 'waiting') && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger mb-1"
                                        onClick={() =>
                                            handleCancelOrder(order._id)
                                        }
                                    >
                                        Huỷ đơn
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
            <Pagination pages={pages} />
        </div>
    );
};

export default Order;
