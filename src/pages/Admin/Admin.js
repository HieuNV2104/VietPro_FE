import { Link } from 'react-router-dom';
import Head from '../../shared/Admin/components/Layout/Head';
import Header from '../../shared/Admin/components/Layout/Header';
import Sidebar from '../../shared/Admin/components/Layout/Sidebar';
import {
    getAdminCategories,
    getAdminProducts,
    getUsers,
    getComments,
    getSales,
    getCustomers,
    getOrders,
    getAdminBanners,
    getAdminSlides
} from '../../services/Api';
import { useState, useEffect } from 'react';

const Admin = () => {
    //state
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalAds, setTotalAds] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    // call API
    useEffect(() => {
        (async () => {
            try {
                // API Products
                const { total: productsTotal } = (await getAdminProducts()).data
                    .data.pages;
                setTotalProducts(productsTotal);
                // API Categories
                const { total: categoriesTotal } = (await getAdminCategories())
                    .data.data.pages;
                setTotalCategories(categoriesTotal);
                // API Users
                const { total: usersTotal } = (await getUsers()).data.data
                    .pages;
                setTotalUsers(usersTotal);
                // API Customers
                const { total: customersTotal } = (await getCustomers()).data
                    .data.pages;
                setTotalCustomers(customersTotal);
                // API Comments
                const { total: commentsTotal } = (await getComments()).data.data
                    .pages;
                setTotalComments(commentsTotal);
                // API Sales
                const { total: salesTotal } = (await getSales()).data.data
                    .pages;
                setTotalSales(salesTotal);
                // API Orders
                const { total: ordersTotal } = (await getOrders()).data.data
                    .pages;
                setTotalOrders(ordersTotal);
                // API ADS
                const { total: slidesTotal } = (await getAdminSlides()).data
                    .data.pages;
                const { total: bannersTotal } = (await getAdminBanners()).data
                    .data.pages;
                setTotalAds(slidesTotal + bannersTotal);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

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
                                    <div className="large">{totalComments}</div>
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
                                    <div className="large">{totalUsers}</div>
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
                                    <div className="large">{totalAds}</div>
                                    <div className="text-muted">Quảng Cáo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-3">
                        <div class="panel panel-widget">
                            <div class="row no-padding">
                                <div class="col-sm-3 col-lg-5 panel-category widget-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="50"
                                        height="50"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
                                    >
                                        <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                        />
                                        <path d="M4 6l16 0" />
                                        <path d="M4 12l16 0" />
                                        <path d="M4 18l16 0" />
                                    </svg>
                                </div>
                                <div class="col-sm-9 col-lg-7 widget-right">
                                    <div class="large">{totalCategories}</div>
                                    <div class="text-muted">Danh mục</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-3">
                        <div class="panel panel-widget">
                            <div class="row no-padding">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        background: '#7837ed'
                                    }}
                                    class="col-sm-3 col-lg-5 panel-category widget-left"
                                >
                                    <span
                                        style={{ fontSize: 35 }}
                                        class="glyphicon glyphicon-gift"
                                    ></span>
                                </div>
                                <div class="col-sm-9 col-lg-7 widget-right">
                                    <div class="large">{totalSales}</div>
                                    <div class="text-muted">Khuyến mãi</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-3">
                        <div class="panel panel-widget">
                            <div class="row no-padding">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        background: '#2ed336'
                                    }}
                                    class="col-sm-3 col-lg-5 panel-category widget-left"
                                >
                                    <span
                                        style={{ fontSize: 35 }}
                                        class="glyphicon glyphicon-user"
                                    ></span>
                                </div>
                                <div class="col-sm-9 col-lg-7 widget-right">
                                    <div class="large">{totalCustomers}</div>
                                    <div class="text-muted">Khách hàng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6 col-lg-3">
                        <div class="panel panel-widget">
                            <div class="row no-padding">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        background: '#607D8B'
                                    }}
                                    class="col-sm-3 col-lg-5 panel-category widget-left"
                                >
                                    <span
                                        style={{ fontSize: 35 }}
                                        class="glyphicon glyphicon-usd"
                                    ></span>
                                </div>
                                <div class="col-sm-9 col-lg-7 widget-right">
                                    <div class="large">{totalOrders}</div>
                                    <div class="text-muted">Đơn hàng</div>
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
