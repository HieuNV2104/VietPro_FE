import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import { getUsers, deleteUser } from '../../../services/Api';
import Pagination from '../../../shared/Admin/components/Pagination';
import { useState, useEffect } from 'react';

const User = () => {
    const [idSearch, setIdSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [pages, setPages] = useState({});
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
            // API products
            const { docs, pages } = (
                await getUsers({
                    params
                })
            ).data.data;
            setUsers(docs);
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
    const handleDeleteUser = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xóa thành viên này không ?'
        );
        if (!confirm) return;
        try {
            const res = await deleteUser(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa thành viên thành công!');
                }, 100);
            } else {
                alert('Xóa thành viên không thành công!');
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
            <Head title={'Quản lý thành viên'} />
            <Header />
            <Sidebar activeSidebar={'users'} />
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
                        <li className="active">Danh sách thành viên</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách thành viên</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
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
                                            <th>Quyền</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users?.map((user) => {
                                            return (
                                                <tr>
                                                    <td>{user?._id}</td>
                                                    <td>{user?.full_name}</td>
                                                    <td>{user?.email}</td>
                                                    <td>
                                                        {user?.role ===
                                                        'admin' ? (
                                                            <span className="label label-danger">
                                                                Admin
                                                            </span>
                                                        ) : (
                                                            <span className="label label-warning">
                                                                Menber
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="form-group">
                                                        <Link
                                                            to={`/admin/users-${user._id}/edit`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        {user.role ===
                                                            'admin' || (
                                                            <Link
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user._id
                                                                    )
                                                                }
                                                                className="btn btn-danger"
                                                            >
                                                                <i className="glyphicon glyphicon-remove" />
                                                            </Link>
                                                        )}
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

export default User;
