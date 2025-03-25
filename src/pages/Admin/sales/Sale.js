import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import { getSales, deleteSale } from '../../../services/Api';
import Pagination from '../../../shared/Admin/components/Pagination';
import { useState, useEffect } from 'react';

const Sale = () => {
    const [idSearch, setIdSearch] = useState('');
    const [sales, setSales] = useState([]);
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
                await getSales({
                    params
                })
            ).data.data;
            setSales(docs);
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
    const handleDeleteSale = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn xóa khuyến mãi này không ?'
        );
        if (!confirm) return;
        try {
            const res = await deleteSale(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa khuyến mãi thành công!');
                }, 100);
            } else {
                alert('Xóa khuyến mãi không thành công!');
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
            <Head title={'Quản lý Khuyến mãi'} />
            <Header />
            <Sidebar activeSidebar={'sales'} />
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
                        <li className="active">Danh sách khuyến mãi</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách khuyến mãi</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
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
                                            <th
                                                data-field="name"
                                                data-sortable="true"
                                            >
                                                Mã khuyến mãi
                                            </th>
                                            <th>Loại hình</th>
                                            <th
                                                data-field="price"
                                                data-sortable="true"
                                            >
                                                Giá trị
                                            </th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales?.map((sale) => {
                                            return (
                                                <tr key={sale?._id}>
                                                    <td>{sale?._id}</td>
                                                    <td>{sale?.code}</td>
                                                    <td>
                                                        {sale?.type === 'direct'
                                                            ? 'Giảm giá trực tiếp'
                                                            : 'Giảm theo phần trăm'}
                                                    </td>
                                                    <td>{sale?.value}</td>
                                                    <td>
                                                        <span
                                                            className={`label label-${
                                                                sale?.status ===
                                                                'valid'
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {sale?.status ===
                                                            'valid'
                                                                ? 'Còn hạn'
                                                                : 'Hết hạn'}
                                                        </span>
                                                    </td>
                                                    <td className="form-group">
                                                        <Link
                                                            to={`/admin/sales-${sale?._id}/edit`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        <Link
                                                            onClick={() =>
                                                                handleDeleteSale(
                                                                    sale._id
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

export default Sale;
