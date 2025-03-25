import { useNavigate, Link } from 'react-router-dom';
import { loginCustomer } from '../../services/Api';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux-setup/reducers/customerReducer';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // data input
    const [data, setData] = useState({});
    // error
    const [error, setError] = useState(false);
    const [openPassword, setOpenPassword] = useState({
        password: false
    });
    //
    const changeOpenPassword = (name) => {
        setOpenPassword({ ...openPassword, [name]: !openPassword[name] });
    };
    const changeData = (e) => {
        const { name, value } = e.target;
        return setData({ ...data, [name]: value });
    };
    //
    const login = () => {
        loginCustomer(data)
            .then(({ data }) => {
                setError(false);
                setData({});
                dispatch(
                    loginSuccess({
                        ...data.customer,
                        accessToken: data.accessToken
                    })
                );
                return navigate('/');
            })
            .catch((error) => {
                if (error.response.data === 'email not valid') {
                    return setError('Email sai !');
                }
                if (error.response.data === 'password not valid') {
                    return setError('Mật khẩu sai !');
                }
                return console.log(error);
            });
    };
    //
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    //
    return (
        <div id="customer">
            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}
            <h3 className="text-center">Đăng nhập</h3>
            <form method="post">
                <div className="row">
                    <div
                        id="customer-mail"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            onChange={changeData}
                            placeholder="Email (bắt buộc)"
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            value={data.email || ''}
                        />
                    </div>
                    <div
                        id="customer-pass"
                        className="col-lg-6 col-md-6 col-sm-12 div-pass"
                    >
                        <input
                            onChange={changeData}
                            placeholder="Mật khẩu (bắt buộc)"
                            type={openPassword.password ? 'text' : 'password'}
                            name="password"
                            className="form-control"
                            required
                            value={data.password || ''}
                        />
                        <Link onClick={() => changeOpenPassword('password')}>
                            <i
                                className={`fa-solid ${
                                    openPassword.password
                                        ? 'fa-eye'
                                        : ' fa-eye-slash'
                                } icon-pass`}
                            ></i>
                        </Link>
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link onClick={login}>
                        <b>Đăng nhập ngay</b>
                    </Link>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link to={'/'}>
                        <b>Quay về trang chủ</b>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link>
                        <i class="fa-brands fa-google"></i>
                        <span style={{ marginLeft: 5 }}>Login with Google</span>
                    </Link>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link>
                        <i class="fa-brands fa-facebook"></i>
                        <span style={{ marginLeft: 5 }}>
                            Login with Facebook
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
