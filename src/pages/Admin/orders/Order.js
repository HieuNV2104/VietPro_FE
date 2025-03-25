import { Link } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { getOrders } from '../../../services/Api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { formatPrice } from '../../../shared/ultils/index';

const Order = () => {
    //state
    const [idSearch, setIdSearch] = useState('');
    const [orders, setOrders] = useState([]);
    const [pages, setPages] = useState({});
    // page
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;
    // call API
    const callAPI = async (id) => {
        try {
            let params = {
                limit: 5,
                page
            };
            if (id) {
                params.id = id;
                params.page = 1;
            }
            // API
            const { docs, pages } = (
                await getOrders({
                    params
                })
            ).data.data;
            setOrders(docs);
            setPages(pages);
        } catch (error) {
            console.log(error);
        }
    };
    //
    const searchId = (e) => {
        setIdSearch(e.target.value);
    };
    const handleSearch = () => {
        callAPI(idSearch);
    };
    // call APi
    useEffect(() => {
        setIdSearch('');
        callAPI('');
    }, [page]);
    //
    return (
        <>
            <Head title={'Quản lý đơn hàng'} />
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
                        <li className="active">Danh sách đơn hàng</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách đơn hàng</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
                        style={{ visibility: 'hidden' }}
                        to={'/admin/sales/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm khuyến
                        mãi
                    </Link>
                    <Search
                        idSearch={idSearch}
                        searchId={searchId}
                        handleSearch={handleSearch}
                    />
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table
                                    data-toolbar="#toolbar"
                                    data-toggle="table"
                                    className="table table-hover table-sm table-bordered"
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                data-field="id"
                                                data-sortable="true"
                                            >
                                                ID
                                            </th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Thanh toán</th>
                                            <th>Chi tiết đơn hàng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders?.map((order) => {
                                            return (
                                                <tr key={order?._id}>
                                                    <td>{order?._id}</td>
                                                    <td>
                                                        {formatPrice(
                                                            order?.totalPrice
                                                        )}
                                                    </td>
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
                                                    <td className="form-group">
                                                        <Link
                                                            to={`/admin/orders-${order._id}`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-arrow-right" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {idSearch ? '' : <Pagination pages={pages} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
