import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav
            className="navbar navbar-inverse navbar-fixed-top"
            role="navigation"
        >
            <div className="container-fluid">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#sidebar-collapse"
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <Link className="navbar-brand" to={'/admin'}>
                        <span>Vietpro</span>Shop
                    </Link>
                    <ul className="user-menu">
                        <li className="dropdown pull-right">
                            <Link
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                <svg className="glyph stroked male-user">
                                    <use xlinkHref="#stroked-male-user" />
                                </svg>
                                Admin <span className="caret" />
                            </Link>
                            <ul className="dropdown-menu" role="menu">
                                <li>
                                    <Link>
                                        <svg className="glyph stroked male-user">
                                            <use xlinkHref="#stroked-male-user" />
                                        </svg>
                                        Hồ sơ
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <svg className="glyph stroked cancel">
                                            <use xlinkHref="#stroked-cancel" />
                                        </svg>
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Header;
