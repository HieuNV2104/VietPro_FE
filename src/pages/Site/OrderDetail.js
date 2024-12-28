import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { orderDetail } from '../../services/Api';
import { formatPrice, getImageProduct } from '../../shared/ultils';

const OrderDetail = () => {
    // id order
    const { id } = useParams();
    // order detail
    const [order, setOrder] = useState({});

    useEffect(() => {
        orderDetail(id)
            .then(({ data }) => setOrder(data.data))
            .catch((error) => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div id="my-cart">
                <div className="row">
                    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
                        Thông tin sản phẩm
                    </div>
                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
                        Số lượng
                    </div>
                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">
                        Giá
                    </div>
                </div>
                <form method="post">
                    {order?.items?.map((item, index) => {
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
                                    <p>{item.qty}</p>
                                </div>
                                <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                                    <b>{formatPrice(item.price * item.qty)}</b>
                                </div>
                            </div>
                        );
                    })}
                    <div className="row">
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12"></div>
                        <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                            <b>Tổng cộng:</b>
                        </div>
                        <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                            <b>{formatPrice(order.totalPrice)}</b>
                        </div>
                    </div>
                </form>
            </div>
            <div id="customer">
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <Link to={'/order'}>
                            <b>Về danh sách đơn hàng</b>
                        </Link>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <Link to={'/'}>
                            <b>Về trang chủ</b>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};
export default OrderDetail;
