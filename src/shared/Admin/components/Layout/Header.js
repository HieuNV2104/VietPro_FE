import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../../../services/Api';
import { logoutUserSuccess } from '../../../../redux-setup/reducers/userReducer';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(({ userReducer }) => userReducer.login);
    //
    const logout = async () => {
        try {
            await logoutUser();
            dispatch(logoutUserSuccess());
            return navigate('/admin/login');
        } catch (error) {
            console.log(error);
        }
    };
    //
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
                    <Link className="navbar-brand" to={'/admin/dashboard'}>
                        <span>Vietpro</span>Shop
                    </Link>
                    <ul className="user-menu">
                        <li className="dropdown pull-right">
                            <Link
                                style={{ borderRight: '1px solid' }}
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                <svg className="glyph stroked male-user">
                                    <use xlinkHref="#stroked-male-user" />
                                </svg>
                                {login && login?.currentUser?.full_name}{' '}
                            </Link>
                            <Link onClick={logout} style={{ paddingLeft: 5 }}>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Header;
