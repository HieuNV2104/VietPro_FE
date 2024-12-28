import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCustomer } from '../../services/Api';
import { useState } from 'react';
import { udpateSuccess } from '../../redux-setup/reducers/authReducer';

const Info = () => {
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    // customer
    const customer = useSelector(
        ({ authReducer }) => authReducer?.login?.currentCustomer
    );
    // data update
    const [data, setData] = useState({
        fullName: customer?.fullName || '',
        phone: customer?.phone || '',
        address: customer?.address || ''
    });
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
                    udpateSuccess({
                        data
                    })
                );
                setError('');
                return setIsSuccess(true);
            })
            .catch((error) => {
                setError(error.response.data);
                setIsSuccess(false);
                return console.log(error);
            });
    };
    if (isSuccess) {
        setTimeout(() => {
            return setIsSuccess(false);
        }, 2000);
    }
    return (
        <div id="customer">
            {error && (
                <div className="alert alert-danger text-center">
                    Số điện thoại đã tồn tại!
                </div>
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
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <input
                            disabled
                            placeholder="Mật khẩu (bắt buộc)"
                            type="password"
                            name="password"
                            className="form-control"
                            value={123456}
                            required
                        />
                    </div>
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
                        className="col-lg-12 col-md-12 col-sm-12"
                    >
                        <input
                            placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                            type="text"
                            name="address"
                            className="form-control"
                            value={data.address}
                            required
                            onChange={(e) => getData(e)}
                        />
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
