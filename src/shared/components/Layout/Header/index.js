import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../../../../redux-setup/reducers/authReducer';
import { logoutCustomer } from '../../../../services/Api';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // name search
    const [nameSearch, setNameSearch] = useState('');
    // login
    const login = useSelector(({ authReducer }) => authReducer.login);
    // total items
    const cartItems = useSelector(({ cartReducer }) => cartReducer.cartItems);
    const totalItems = cartItems.reduce((total, item) => {
        return (total += item.qty);
    }, 0);

    // handle search name
    const handleChangeNameSearch = (e) => setNameSearch(e.target.value);
    // search
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?name=${nameSearch}`);
        setNameSearch('');
    };

    // logout
    const logout = (e) => {
        dispatch(logoutSuccess());
        logoutCustomer(login?.currentCustomer?._id)
            .then(() => navigate('/'))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
                            <h1>
                                <Link to={'/'}>
                                    <img
                                        className="img-fluid"
                                        src="images/logo.png"
                                        alt="logo"
                                    />
                                </Link>
                            </h1>
                        </div>
                        <div
                            id="search"
                            className="col-lg-4 col-md-12 col-sm-12"
                        >
                            <form className="form-inline">
                                <input
                                    className="form-control mt-3"
                                    type="search"
                                    placeholder="Tìm kiếm"
                                    aria-label="Search"
                                    value={nameSearch}
                                    onChange={(e) => handleChangeNameSearch(e)}
                                />
                                <button
                                    className="btn btn-danger mt-3"
                                    type="submit"
                                    onClick={(e) => handleSearch(e)}
                                >
                                    Tìm kiếm
                                </button>
                            </form>
                        </div>
                        <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
                            <i className="fa-solid fa-user mr-1" />
                            {login?.loggedIn ? (
                                <>
                                    <Link className="mr-2" to={'/info'}>
                                        {login.currentCustomer.fullName}
                                    </Link>
                                    |
                                    <Link
                                        onClick={logout}
                                        className="mr-2 ml-2"
                                    >
                                        đăng xuất
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link className="mr-2" to={'/login'}>
                                        đăng nhập
                                    </Link>
                                    |
                                    <Link
                                        className="mr-2 ml-2"
                                        to={'/register'}
                                    >
                                        đăng ký
                                    </Link>
                                </>
                            )}
                            |
                            <Link className="mt-4 mr-2 ml-2" href="#">
                                giỏ hàng
                                <ul>
                                    <li>
                                        <Link to={'/cart'}>
                                            <i className="fas fa-shopping-cart" />{' '}
                                            Giỏ hàng của bạn
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/order'}>
                                            <i className="fas fa-file-alt" />
                                            Đơn hàng đã mua
                                        </Link>
                                    </li>
                                </ul>
                            </Link>
                            <span className="mt-3">{totalItems}</span>
                        </div>
                    </div>
                </div>
                <button
                    className="navbar-toggler navbar-light"
                    type="button"
                    data-toggle="collapse"
                    data-target="#menu"
                >
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
        </>
    );
};

export default Header;
