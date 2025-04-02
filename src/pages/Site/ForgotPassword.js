import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getOtp, checkOtp, updateNewPassword } from '../../services/Api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [hideInputPassword, setHideInputPassword] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [tmpToken, setTmpToken] = useState(null);
    const [data, setData] = useState({});
    const [openPassword, setOpenPassword] = useState({
        password: false
    });
    //
    const changeOpenPassword = (name) => {
        setOpenPassword({ ...openPassword, [name]: !openPassword[name] });
    };
    const channgData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    // get otp
    const handleGetOtp = async () => {
        setData({ ...data, otp: '' });
        setHideInputPassword(false);
        if (!data.email) {
            setError('Vui lòng nhập địa chỉ email!');
            return;
        }
        try {
            const res = await getOtp({ email: data.email });
            if (res.status === 200) {
                setAlert(
                    'Hệ thống đã gửi mã OTP cho bạn, vui lòng kiểm tra email'
                );
                setError('');
            }
        } catch (error) {
            if (error.response.data === 'Email not valid!') {
                setError('Email sai');
                setAlert('');
            }
        }
    };
    // check otp
    const handleCheckOtp = async () => {
        if (!data.otp) {
            setError('Vui lòng nhập mã OTP');
            return;
        }
        if (!data.email) {
            setError('Vui lòng nhập địa chỉ email!');
            return;
        }
        try {
            const res = await checkOtp({ email: data.email, otp: data.otp });
            if (res.status === 200) {
                setAlert(
                    'Xác thực mã OTP thành công, vui lòng nhập mật khẩu mới'
                );
                setHideInputPassword(true);
                setTmpToken(res.data.tmpToken);
            }
        } catch (error) {
            if (error.response.data === 'OTP not valid!') {
                setError('Mã OTP sai hoặc hết thời gian');
                setAlert('');
                setHideInputPassword(false);
            }
        }
    };
    // update new password
    const handleUpdatePassword = async () => {
        if (!data.password) {
            setError('Vui lòng nhập mật khẩu!');
            return;
        }
        try {
            const res = await updateNewPassword({
                tmpToken,
                password: data.password
            });
            if (res.status === 200) {
                setAlert('Cập nhật mật khẩu mới thành công');
                setTimeout(() => {
                    return navigate('/login');
                }, 2000);
            }
        } catch (error) {
            if (error.response.data === 'Fail Update Password!') {
                setError('Cập nhật lỗi, vui lòng thử lại');
                setAlert('');
            }
        }
    };
    //
    useEffect(() => {
        if (error || alert) {
            const timer = setTimeout(() => {
                setError(null);
                setAlert(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error, alert]);
    //
    return (
        <div id="customer">
            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}
            {alert && (
                <div className="alert alert-primary text-center">{alert}</div>
            )}
            <h3 className="text-center">Đặt mật khẩu mới</h3>
            <form method="post">
                <div className="row">
                    <div
                        id="customer-mail"
                        className="col-lg-12 col-md-12 col-sm-12"
                    >
                        <input
                            onChange={channgData}
                            placeholder="Email (bắt buộc)"
                            type="email"
                            name="email"
                            className="form-control"
                            required
                            value={data.email || ''}
                        />
                    </div>
                    <div
                        id="customer-mail"
                        className="col-lg-8 col-md-8 col-sm-8"
                    >
                        <input
                            onChange={channgData}
                            disabled={!data.email}
                            placeholder="Mã OTP"
                            type="text"
                            name="otp"
                            className="form-control"
                            value={data.otp || ''}
                        />
                    </div>
                    <div
                        id="customer-mail"
                        className="col-lg-4 col-md-4 col-sm-4"
                    >
                        <button
                            type="button"
                            disabled={hideInputPassword}
                            className="btn btn-success"
                            onClick={handleCheckOtp}
                        >
                            Xác thực mã OTP
                        </button>
                    </div>
                    {hideInputPassword && (
                        <div
                            id="customer-pass"
                            className="col-lg-12 col-md-12 col-sm-12 div-pass"
                        >
                            <input
                                onChange={channgData}
                                placeholder="Mật khẩu mới"
                                type={
                                    openPassword.password ? 'text' : 'password'
                                }
                                name="password"
                                className="form-control"
                                required
                                value={data.password || ''}
                            />
                            <Link
                                onClick={() => changeOpenPassword('password')}
                            >
                                <i
                                    className={`fa-solid ${
                                        openPassword.password
                                            ? 'fa-eye'
                                            : ' fa-eye-slash'
                                    } icon-pass`}
                                ></i>
                            </Link>
                        </div>
                    )}
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link onClick={handleGetOtp}>
                        <b>Lấy mã OTP</b>
                    </Link>
                </div>
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    {hideInputPassword ? (
                        <Link onClick={handleUpdatePassword}>
                            <b>Cập nhật mật khẩu mới</b>
                        </Link>
                    ) : (
                        <Link to={'/login'}>
                            <b>Về trang đăng nhập</b>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
