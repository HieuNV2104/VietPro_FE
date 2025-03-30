import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer } from '../../services/Api';
import { useState, useEffect } from 'react';
import { updateSuccess } from '../../redux-setup/reducers/customerReducer';

const Info = () => {
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [openPassword, setOpenPassword] = useState({
        password: false,
        new_password: false
    });
    // customer
    const customer = useSelector(
        ({ customerReducer }) => customerReducer?.login?.currentCustomer
    );
    // data update
    const [data, setData] = useState({
        fullName: customer?.fullName || '',
        phone: customer?.phone || '',
        address: customer?.address || ''
    });
    const changeOpenPassword = (name) => {
        setOpenPassword({ ...openPassword, [name]: !openPassword[name] });
    };
    // get data update
    const getData = (e) => {
        const { name, value } = e.target;
        return setData({ ...data, [name]: value });
    };
    // update;
    const update = () => {
        updateCustomer(customer._id, data)
            .then(() => {
                dispatch(
                    updateSuccess({
                        data
                    })
                );
                setError('');
                setData({ ...data, password: '', new_password: '' });
                return setIsSuccess(true);
            })
            .catch((error) => {
                if (error.response.data === 'Phone exists!') {
                    setError('Số điện thoại đã tồn tại');
                }
                if (error.response.data === 'Blank password!') {
                    setError('Nhập thiếu mật khẩu');
                }
                if (error.response.data === 'Wrong password!') {
                    setError('Sai mật khẩu');
                }
                setIsSuccess(false);
                return console.log(error);
            });
    };
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
        if (isSuccess) {
            setTimeout(() => {
                return setIsSuccess(false);
            }, 2000);
        }
    }, [error, isSuccess]);
    return (
        <div id="customer">
            {error && (
                <div className="alert alert-danger text-center">{error}</div>
            )}
            {isSuccess && (
                <div className="alert alert-success text-center">
                    Cập nhật thông tin thành công!
                </div>
            )}
            <h3 className="text-center">Thông tin tài khoản</h3>
            <form method="post">
                <div className="row">
                    <div
                        id="customer-mail"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            disabled
                            placeholder="Email (bắt buộc)"
                            type="email"
                            name="email"
                            className="form-control"
                            value={customer?.email}
                            required
                        />
                    </div>
                    <div
                        id="customer-name"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            placeholder="Họ và tên (bắt buộc)"
                            type="text"
                            name="fullName"
                            className="form-control"
                            value={data.fullName}
                            required
                            onChange={(e) => getData(e)}
                        />
                    </div>
                    <div
                        id="customer-pass"
                        className="col-lg-6 col-md-6 col-sm-12 div-pass"
                    >
                        <input
                            onChange={getData}
                            placeholder="Mật khẩu cũ"
                            type={openPassword.password ? 'text' : 'password'}
                            name="password"
                            className="form-control"
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
                        id="customer-pass"
                        className="col-lg-6 col-md-6 col-sm-12 div-pass"
                    >
                        <input
                            onChange={getData}
                            placeholder="Mật khẩu mới"
                            type={
                                openPassword.new_password ? 'text' : 'password'
                            }
                            name="new_password"
                            className="form-control"
                            value={data.new_password || ''}
                        />
                        <Link
                            onClick={() => changeOpenPassword('new_password')}
                        >
                            <i
                                className={`fa-solid ${
                                    openPassword.new_password
                                        ? 'fa-eye'
                                        : ' fa-eye-slash'
                                } icon-pass`}
                            ></i>
                        </Link>
                    </div>
                    <div
                        id="customer-phone"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            placeholder="Số điện thoại (bắt buộc)"
                            type="text"
                            name="phone"
                            className="form-control"
                            value={data.phone}
                            required
                            onChange={(e) => getData(e)}
                        />
                    </div>
                    <div
                        id="customer-add"
                        className="col-lg-6 col-md-12 col-sm-12"
                    >
                        <textarea
                            rows={1}
                            placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                            type="text"
                            name="address"
                            className="form-control"
                            value={data.address}
                            required
                            onChange={(e) => getData(e)}
                        ></textarea>
                    </div>
                </div>
            </form>
            <div className="row">
                <div className="by-now col-lg-6 col-md-6 col-sm-12">
                    <Link onClick={update}>
                        <b>Cập nhật ngay</b>
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

export default Info;
