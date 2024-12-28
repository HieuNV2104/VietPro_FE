import { Link } from 'react-router-dom';

const sidebar = ({ activeSidebar }) => {
    return (
        <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
            <form role="search">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                    />
                </div>
            </form>
            <ul className="nav menu">
                <li className={activeSidebar === 'dashboard' && 'active'}>
                    <Link to={'/admin'}>
                        <svg className="glyph stroked dashboard-dial">
                            <use xlinkHref="#stroked-dashboard-dial" />
                        </svg>
                        Dashboard
                    </Link>
                </li>
                <li className={activeSidebar === 'users' && 'active'}>
                    <Link to={'/admin/users'}>
                        <svg className="glyph stroked male user">
                            <use xlinkHref="#stroked-male-user" />
                        </svg>
                        Quản lý thành viên
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
                <li className={activeSidebar === 'ads' && 'active'}>
                    <Link to={'/admin/ads'}>
                        <svg className="glyph stroked chain">
                            <use xlinkHref="#stroked-chain" />
                        </svg>
                        Quản lý quảng cáo
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

export default sidebar;
