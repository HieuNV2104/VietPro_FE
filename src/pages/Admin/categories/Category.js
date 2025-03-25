import { Link } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { getAdminCategories, deleteCategory } from '../../../services/Api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Category = () => {
    //state
    const [idSearch, setIdSearch] = useState('');
    const [categories, setCategories] = useState([]);
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
                await getAdminCategories({
                    params
                })
            ).data.data;
            setCategories(docs);
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
    const handleDeleteCategory = async (id) => {
        const confirm = window.confirm('Bạn có muốn xóa danh mục này không ?');
        if (!confirm) {
            return;
        }
        try {
            const res = await deleteCategory(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa danh mục thành công!');
                }, 100);
            } else {
                alert('Xóa danh mục không thành công!');
            }
        } catch (error) {
            alert('Đã có sản phẩm dùng danh mục này!');
        }
    };
    // call APi
    useEffect(() => {
        setIdSearch('');
        callAPI('');
    }, [page]);
    //
    return (
        <>
            <Head title={'Quản lý danh mục'} />
            <Header />
            <Sidebar activeSidebar={'categories'} />
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
                        <li className="active">Quản lý danh mục</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý danh mục</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div id="toolbar" className="btn-group">
                    <Link
                        to={'/admin/categories/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm danh mục
                    </Link>
                    <Search
                        idSearch={idSearch}
                        searchId={searchId}
                        handleSearch={handleSearch}
                    />
                </div>
                <div className="row">
                    <div className="col-md-12">
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
                                            <th>Tên danh mục</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((category, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{category?._id}</td>
                                                    <td>{category?.name}</td>
                                                    <td className="form-group">
                                                        <Link
                                                            to={`/admin/categories-${category?._id}/edit`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        <Link
                                                            onClick={() =>
                                                                handleDeleteCategory(
                                                                    category._id
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
                {/*/.row*/}
            </div>{' '}
            {/*/.main*/}
        </>
    );
};

export default Category;
