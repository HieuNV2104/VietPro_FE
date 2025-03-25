import { registerCustomer } from '../../services/Api';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    // data input
    const [data, setData] = useState({});
    // error
    const [alert, setAlert] = useState(false);
    // status register
    const [status, setStatus] = useState(false);
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
    const register = () => {
        registerCustomer(data)
            .then(() => {
                setAlert('Đăng ký tài khoản thành công');
                setStatus(true);
                setData({});
                setTimeout(() => {
                    return navigate('/login');
                }, 1000);
            })
            .catch((error) => {
                if (error.response.data === 'email exists') {
                    return setAlert('Email đã tồn tại !');
                }
                if (error.response.data === 'phone exists') {
                    return setAlert('Số điện thoại đã tồn tại !');
                }
                console.log(error);
                setTimeout(() => {
                    setAlert('');
                }, 2000);
            });
    };
    //
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alert]);
    //
    return (
        <div id="customer">
            {alert && (
                <div
                    className={`alert ${
                        status ? 'alert-success' : 'alert-danger'
                    } text-center`}
                >
                    {alert}
                </div>
            )}
            <h3 className="text-center">Đăng ký</h3>
            <form method="post" onSubmit={register}>
                <div className="row">
                    <div
                        id="customer-name"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            onChange={changeData}
                            placeholder="Họ và tên (bắt buộc)"
                            type="text"
                            name="fullName"
                            className="form-control"
                            required
                            value={data.fullName || ''}
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
                        id="customer-phone"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            onChange={changeData}
                            placeholder="Số điện thoại (bắt buộc)"
                            type="text"
                            name="phone"
                            className="form-control"
                            required
                            value={data.phone || ''}
                        />
                    </div>
                    <div
                        id="customer-add"
                        className="col-lg-12 col-md-12 col-sm-12"
                    >
                        <input
                            onChange={changeData}
                            placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                            type="text"
                            name="address"
                            className="form-control"
                            required
                            value={data.address || ''}
                        />
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link onClick={register}>
                        <b>Đăng ký ngay</b>
                    </Link>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link to={'/'}>
                        <b>Quay về trang chủ</b>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
