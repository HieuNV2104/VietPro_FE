import { Link } from 'react-router-dom';
import Head from '../../shared/Admin/components/Layout/Head';
import Header from '../../shared/Admin/components/Layout/Header';
import Sidebar from '../../shared/Admin/components/Layout/Sidebar';
import { getCategories, getProducts } from '../../services/Api';
import { useState, useEffect } from 'react';

const Admin = () => {
    //state
    const [totalProducts, setTotalProducts] = useState(0);
    // const [totalCategories, setTotalCategories] = useState(0);

    // call API
    useEffect(() => {
        (async () => {
            try {
                // API products
                const { total: productsTotal } = (await getProducts()).data.data
                    .pages;
                setTotalProducts(productsTotal);

                // API Categories
                // const { total: categoriesTotal } = (await getCategories()).data
                //     .data.pages;
                // setTotalCategories(categoriesTotal);
                // console.log(totalProducts);
                // console.log(totalCategories);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [totalProducts]);

    return (
        <>
            <Head title={'Vietpro Mobile Shop - Administrator'} />
            <Header />
            <Sidebar activeSidebar={'dashboard'} />
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <Link to={'/admin'}>
                                <svg className="glyph stroked home">
                                    <use xlinkHref="#stroked-home" />
                                </svg>
                            </Link>
                        </li>
                        <li className="active">Trang chủ quản trị</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Trang chủ quản trị</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-blue panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked bag">
                                        <use xlinkHref="#stroked-bag" />
                                    </svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{totalProducts}</div>
                                    <div className="text-muted">Sản Phẩm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-orange panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked empty-message">
                                        <use xlinkHref="#stroked-empty-message" />
                                    </svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">52</div>
                                    <div className="text-muted">Bình Luận</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-teal panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked male-user">
                                        <use xlinkHref="#stroked-male-user" />
                                    </svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">24</div>
                                    <div className="text-muted">Thành Viên</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-red panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked app-window-with-content">
                                        <use xlinkHref="#stroked-app-window-with-content" />
                                    </svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">25.2k</div>
                                    <div className="text-muted">Quảng Cáo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
