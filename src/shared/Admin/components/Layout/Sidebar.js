import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ activeSidebar, activeAds }) => {
    const login = useSelector(({ userReducer }) => userReducer.login);

    //
    return (
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
            <div className="menu-name">menu admin</div>
            <ul className="nav menu">
                <li className={activeSidebar === 'dashboard' && 'active'}>
                    <Link to={'/admin/dashboard'}>
                        <svg className="glyph stroked dashboard-dial">
                            <use xlinkHref="#stroked-dashboard-dial" />
                        </svg>
                        Dashboard
                    </Link>
                </li>
                {login.currentUser && login.currentUser.role === 'admin' && (
                    <li className={activeSidebar === 'users' && 'active'}>
                        <Link to={'/admin/users'}>
                            <svg className="glyph stroked male user">
                                <use xlinkHref="#stroked-male-user" />
                            </svg>
                            Quản lý thành viên
                        </Link>
                    </li>
                )}
                <li className={activeSidebar === 'customers' && 'active'}>
                    <Link
                        style={{ display: 'flex', alignItems: 'center' }}
                        to={'/admin/customers'}
                    >
                        <svg
                            style={{ marginRight: 10 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-person-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                                fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                        </svg>
                        Quản lý khách hàng
                    </Link>
                </li>
                <li className={activeSidebar === 'categories' && 'active'}>
                    <Link to={'/admin/categories'}>
                        <svg className="glyph stroked open folder">
                            <use xlinkHref="#stroked-open-folder" />
                        </svg>
                        Quản lý danh mục
                    </Link>
                </li>
                <li className={activeSidebar === 'products' && 'active'}>
                    <Link to={'/admin/products'}>
                        <svg className="glyph stroked bag">
                            <use xlinkHref="#stroked-bag" />
                        </svg>
                        Quản lý sản phẩm
                    </Link>
                </li>
                <li className={activeSidebar === 'comments' && 'active'}>
                    <Link to={'/admin/comments'}>
                        <svg className="glyph stroked two messages">
                            <use xlinkHref="#stroked-two-messages" />
                        </svg>
                        Quản lý bình luận
                    </Link>
                </li>
                <li className={activeSidebar === 'orders' && 'active'}>
                    <Link
                        style={{ display: 'flex', alignItems: 'center' }}
                        to={'/admin/orders'}
                    >
                        <svg
                            style={{ marginRight: 10 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-receipt"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
                            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
                        </svg>
                        Quản lý đơn hàng
                    </Link>
                </li>
                <li className={activeSidebar === 'sales' && 'active'}>
                    <Link
                        style={{ display: 'flex', alignItems: 'center' }}
                        to={'/admin/sales'}
                    >
                        <svg
                            style={{ marginRight: 10 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-percent"
                            viewBox="0 0 16 16"
                        >
                            <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                        </svg>
                        Quản lý khuyến mãi
                    </Link>
                </li>
                <li
                    className={`menu-item-1 ${
                        activeSidebar === 'ads' && 'active-menu'
                    }`}
                >
                    <Link>
                        <svg className="glyph stroked chain">
                            <use xlinkHref="#stroked-chain" />
                        </svg>
                        Quản lý quảng cáo
                        <ul className="menu-2">
                            <li
                                className={`menu-item-2 ${
                                    activeAds === 'banners' && 'active'
                                }`}
                            >
                                <Link
                                    style={{ marginTop: 10 }}
                                    to={'/admin/ads/banners'}
                                >
                                    Banner
                                </Link>
                            </li>
                            <li
                                className={`menu-item-2 ${
                                    activeAds === 'slides' && 'active'
                                }`}
                            >
                                <Link
                                    style={{ marginBottom: -10 }}
                                    to={'/admin/ads/slides'}
                                >
                                    Slider
                                </Link>
                            </li>
                        </ul>
                    </Link>
                </li>
                <li className={activeSidebar === 'setting' && 'active'}>
                    <Link to={'/admin/setting'}>
                        <svg className="glyph stroked gear">
                            <use xlinkHref="#stroked-gear" />
                        </svg>
                        Cấu hình
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
