import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { getImageProduct, formatPrice } from '../../../shared/ultils';
import {
    getAdminProducts,
    getCategories,
    deleteProduct
} from '../../../services/Api';
import { useState, useEffect } from 'react';

const Product = () => {
    //state
    const [idSearch, setIdSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState({});
    // page
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
            // API products
            const { docs: productsDocs, pages: productsPages } = (
                await getAdminProducts({
                    params
                })
            ).data.data;
            setProducts(productsDocs);
            setPages(productsPages);
            // API Categories
            const { docs: categoriesDocs } = (
                await getCategories({ params: { limit: 20 } })
            ).data.data;
            setCategories(categoriesDocs);
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
    const handleDeleteProduct = async (id) => {
        const confirm = window.confirm('Bạn có muốn xóa sản phẩm này không ?');
        if (!confirm) return;
        try {
            const res = await deleteProduct(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa sản phẩm thành công!');
                }, 100);
            } else {
                alert('Xóa sản phẩm không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    // call APi
    useEffect(() => {
        setIdSearch('');
        callAPI('');
    }, [page]);

    return (
        <>
            <Head title={'Quản lý sản phẩm'} />
            <Header />
            <Sidebar activeSidebar={'products'} />
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
                        <li className="active">Danh sách sản phẩm</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách sản phẩm</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div id="toolbar" className="btn-group">
                    <Link
                        to={'/admin/products/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm sản phẩm
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
                                                Tên sản phẩm
                                            </th>
                                            <th
                                                data-field="price"
                                                data-sortable="true"
                                            >
                                                Giá
                                            </th>
                                            <th>Ảnh sản phẩm</th>
                                            <th>Trạng thái</th>
                                            <th>Danh mục</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products?.map((product, index) => {
                                            let category_id = '';
                                            for (let category of categories) {
                                                if (
                                                    category?._id ===
                                                    product?.category_id
                                                ) {
                                                    category_id =
                                                        category?.name;
                                                }
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{product?._id}</td>
                                                    <td>{product?.name}</td>
                                                    <td>
                                                        {formatPrice(
                                                            product?.price
                                                        )}
                                                    </td>
                                                    <td
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                    >
                                                        <img
                                                            width={130}
                                                            height={180}
                                                            src={getImageProduct(
                                                                product?.image
                                                            )}
                                                            alt="img"
                                                        />
                                                    </td>
                                                    <td>
                                                        {product?.is_stock ? (
                                                            <span className="label label-success">
                                                                Còn hàng
                                                            </span>
                                                        ) : (
                                                            <span className="label label-danger">
                                                                Hết hàng
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>{category_id}</td>
                                                    <td className="form-group">
                                                        <Link
                                                            to={`/admin/products-${product._id}/edit`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        <Link
                                                            className="btn btn-danger"
                                                            onClick={() =>
                                                                handleDeleteProduct(
                                                                    product._id
                                                                )
                                                            }
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

export default Product;
