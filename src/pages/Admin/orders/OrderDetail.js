import { Link, useParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import { formatPrice } from '../../../shared/ultils/index';
import {
    getOrderDetail,
    cancelOrder,
    confirmOrder,
    deliveredOrder,
    doneOrder
} from '../../../services/Api';

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [customer, setCustomer] = useState({});
    //
    const handleCancelOrder = async (id) => {
        const confirm = window.confirm('Bạn có muốn hủy đơn hàng này không ?');
        if (confirm) {
            try {
                const res = await cancelOrder(id);
                if (res.status === 200) {
                    setTimeout(() => {
                        alert('Bạn đã hủy đơn hàng thành công');
                    }, 100);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return false;
        }
    };
    const handleConfirmOrder = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xác nhận đơn hàng này không ?'
        );
        if (confirm) {
            try {
                const res = await confirmOrder(id);
                if (res.status === 200) {
                    setTimeout(() => {
                        alert('Bạn đã xác nhận đơn hàng thành công');
                    }, 100);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return false;
        }
    };
    const handleDeliveredOrder = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xác nhận đơn hàng này đã giao thành công không ?'
        );
        if (confirm) {
            try {
                const res = await deliveredOrder(id);
                if (res.status === 200) {
                    setTimeout(() => {
                        alert('Bạn đã xác nhận đơn hàng đã giao thành công');
                    }, 100);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return false;
        }
    };
    const handleDoneOrder = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xác nhận đơn hàng này đã hoàn thành không ?'
        );
        if (confirm) {
            try {
                const res = await doneOrder(id);
                if (res.status === 200) {
                    setTimeout(() => {
                        alert('Bạn đã xác nhận đơn hàng hoàn thành thành công');
                    }, 100);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return false;
        }
    };
    //
    useEffect(() => {
        (async () => {
            try {
                const { docs, customer } = (await getOrderDetail(id)).data.data;
                setOrder(docs);
                setCustomer(customer);
            } catch (error) {
                console.log(error);
            }
        })();
    });
    //
    return (
        <>
            <Head title={'Chi tiết đơn hàng'} />
            <Header />
            <Sidebar activeSidebar={'orders'} />
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <Link to={'/admin/dashboard'}>
                                <svg className="glyph stroked home">
                                    <use xlinkHref="#stroked-home" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/orders'}>Quản lý đơn hàng</Link>
                        </li>
                        <li className="active">{order?._id}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Đơn hàng: {order?._id}</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div>
                                    <h3
                                        style={{
                                            marginTop: 0,
                                            textAlign: 'center'
                                        }}
                                    >
                                        Thông tin đơn hàng
                                    </h3>
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td>Họ và tên: </td>
                                                <td>{customer?.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td>Số điện thoại: </td>
                                                <td>{customer?.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Email: </td>
                                                <td>{customer?.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Địa chỉ giao hàng: </td>
                                                <td>{customer?.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Thanh toán: </td>
                                                <td>
                                                    <span
                                                        className={`label label-${
                                                            order?.is_paid
                                                                ? 'success'
                                                                : 'danger'
                                                        }`}
                                                    >
                                                        {order?.is_paid
                                                            ? 'Đã thanh toán'
                                                            : 'Chưa thanh toán'}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Trạng thái: </td>
                                                <td>
                                                    {order?.status ===
                                                        'waiting' && (
                                                        <span className="label label-warning">
                                                            Chờ duyệt
                                                        </span>
                                                    )}
                                                    {order?.status ===
                                                        'delivered' && (
                                                        <span className="label label-success">
                                                            Đã giao
                                                        </span>
                                                    )}
                                                    {order?.status ===
                                                        'cancelled' && (
                                                        <span className="label label-danger">
                                                            Đã hủy
                                                        </span>
                                                    )}
                                                    {order?.status ===
                                                        'shipping' && (
                                                        <span className="label label-primary">
                                                            Đang giao
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <h3 style={{ textAlign: 'center' }}>
                                    Danh sách sản phẩm
                                </h3>
                                <table
                                    data-toolbar="#toolbar"
                                    data-toggle="table"
                                    className="table table-hover table-sm table-bordered"
                                >
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Giá tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.items?.map((item) => {
                                            return (
                                                <tr>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.qty}</td>
                                                    <td>
                                                        {formatPrice(
                                                            item?.price
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <p
                                    style={{
                                        fontSize: 20,
                                        textTransform: 'uppercase',
                                        fontWeight: 'bold',
                                        textAlign: 'right',
                                        color: '#5f6468'
                                    }}
                                >
                                    Tổng tiền:{' '}
                                    <span
                                        style={{
                                            textTransform: 'none',
                                            fontWeight: 'normal'
                                        }}
                                    >
                                        {formatPrice(order?.totalPrice)}
                                    </span>
                                </p>
                                <div style={{ textAlign: 'right' }}>
                                    {order?.status === 'waiting' && (
                                        <Link
                                            onClick={() =>
                                                handleConfirmOrder(order?._id)
                                            }
                                            className="btn btn-primary"
                                        >
                                            Duyệt đơn
                                        </Link>
                                    )}
                                    {(order?.status === 'waiting' ||
                                        order?.status === 'shipping' ||
                                        (order?.status === 'delivered' &&
                                            !order?.is_paid)) && (
                                        <Link
                                            onClick={() =>
                                                handleCancelOrder(order?._id)
                                            }
                                            className="btn btn-danger"
                                        >
                                            Huỷ đơn
                                        </Link>
                                    )}
                                    {order?.status !== 'cancelled' &&
                                        order?.status !== 'delivered' && (
                                            <Link
                                                onClick={() =>
                                                    handleDeliveredOrder(
                                                        order?._id
                                                    )
                                                }
                                                className="btn btn-success"
                                            >
                                                Đã giao
                                            </Link>
                                        )}
                                    {order?.status !== 'cancelled' &&
                                        !order?.is_paid && (
                                            <Link
                                                onClick={() =>
                                                    handleDoneOrder(order?._id)
                                                }
                                                className="btn btn-success"
                                            >
                                                Hoàn thành đơn
                                            </Link>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /.col*/}
                </div>
                {/* /.row */}
            </div>{' '}
            {/*/.main*/}
        </>
    );
};

export default OrderDetail;
