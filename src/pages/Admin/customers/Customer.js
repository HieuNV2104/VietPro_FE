import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer } from '../../../services/Api';

const Customer = () => {
    const [idSearch, setIdSearch] = useState('');
    const [customers, setCustomers] = useState([]);
    const [pages, setPages] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;
    // call API
    const callAPI = async (id) => {
        try {
            let params = {
                limit: 10,
                page
            };
            if (id) {
                params.id = id;
                params.page = 1;
            }
            const { docs, pages } = (
                await getCustomers({
                    params
                })
            ).data.data;
            setCustomers(docs);
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
    //
    const handleDeleteCustomer = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xóa khách hàng này không ?'
        );
        if (!confirm) return;
        try {
            if (page > 1) {
                setSearchParams({ page: 1 });
            } else {
                callAPI();
            }
            const res = await deleteCustomer(id);
            if (res.status === 200) {
                callAPI('');
                setTimeout(() => {
                    alert('Bạn đã xóa khách hàng thành công!');
                }, 100);
            } else {
                alert('Xóa khách hàng không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //
    useEffect(() => {
        setIdSearch('');
        callAPI('');
    }, [page]);
    //
    return (
        <>
            <Head title={'Quản lý khách hàng'} />
            <Header />
            <Sidebar activeSidebar={'customers'} />
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
                        <li className="active">Danh sách khách hàng</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách khách hàng</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
                        style={{ visibility: 'hidden' }}
                        to={'/admin/users/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm thành
                        viên
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
                                            <th
                                                data-field="name"
                                                data-sortable="true"
                                            >
                                                Họ &amp; Tên
                                            </th>
                                            <th
                                                data-field="price"
                                                data-sortable="true"
                                            >
                                                Email
                                            </th>
                                            <th>Số điện thoại</th>
                                            <th>Địa chỉ</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers?.map((customer) => {
                                            return (
                                                <tr key={customer?._id}>
                                                    <td>{customer?._id}</td>
                                                    <td>
                                                        {customer?.fullName}
                                                    </td>
                                                    <td>{customer?.email}</td>
                                                    <td>{customer?.phone}</td>
                                                    <td>{customer?.address}</td>
                                                    <td className="form-group">
                                                        <Link
                                                            onClick={() =>
                                                                handleDeleteCustomer(
                                                                    customer?._id
                                                                )
                                                            }
                                                            className="btn btn-danger"
                                                        >
                                                            <i className="glyphicon glyphicon-remove" />
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

export default Customer;
