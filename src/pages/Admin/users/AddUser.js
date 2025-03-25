import { Link, useNavigate } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import { createUser } from '../../../services/Api';

const AddUser = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [openPassword, setOpenPassword] = useState({
        password: false,
        re_password: false
    });
    //
    const changeOpenPassword = (name) => {
        setOpenPassword({ ...openPassword, [name]: !openPassword[name] });
    };
    const changeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        console.log(data);
    };
    const resetData = () => {
        setData({});
        setError(null);
    };
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            if (data.password === data.re_password) {
                const { re_password, ...other } = data;
                const res = await createUser(other);
                if (res.status === 200) {
                    navigate('/admin/users');
                }
            } else {
                setError('Wrong password');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data);
            }
        }
    };
    //
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    //
    return (
        <>
            <Head title={'Thêm thành viên'} />
            <Header />
            <Sidebar activeSidebar={'users'} />
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <Link to={'/admin/dashboard'}>
                                <svg className="glyph stroked home">
                                    <use xlinkHref="#stroked-home" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/admin/users'}>Quản lý thành viên</Link>
                        </li>
                        <li className="active">Thêm thành viên</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm thành viên</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {error && (
                                        <div className="alert alert-danger">
                                            {error === 'Wrong password'
                                                ? 'Mật khẩu không trùng khớp !'
                                                : 'Email đã tồn tại !'}
                                        </div>
                                    )}
                                    <form
                                        role="form"
                                        method="post"
                                        onReset={resetData}
                                        onSubmit={handleCreateUser}
                                    >
                                        <div className="form-group">
                                            <label>Họ &amp; Tên</label>
                                            <input
                                                name="full_name"
                                                required
                                                className="form-control"
                                                placeholder
                                                value={data.full_name || ''}
                                                onChange={changeData}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                required
                                                type="email"
                                                className="form-control"
                                                value={data.email || ''}
                                                onChange={changeData}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu</label>
                                            <div className="box-password">
                                                <input
                                                    name="password"
                                                    required
                                                    type={
                                                        openPassword.password
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    className="form-control"
                                                    value={data.password || ''}
                                                    onChange={changeData}
                                                />
                                                <Link
                                                    onClick={() =>
                                                        changeOpenPassword(
                                                            'password'
                                                        )
                                                    }
                                                    className="icon-password"
                                                    style={{
                                                        color: 'black'
                                                    }}
                                                >
                                                    <i
                                                        className={`glyphicon glyphicon-eye-${
                                                            openPassword.password
                                                                ? 'close'
                                                                : 'open'
                                                        }`}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Nhập lại mật khẩu</label>
                                            <div className="box-password">
                                                <input
                                                    name="re_password"
                                                    required
                                                    type={
                                                        openPassword.re_password
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    className="form-control"
                                                    value={
                                                        data.re_password || ''
                                                    }
                                                    onChange={changeData}
                                                />
                                                <Link
                                                    onClick={() =>
                                                        changeOpenPassword(
                                                            're_password'
                                                        )
                                                    }
                                                    className="icon-password"
                                                    style={{
                                                        color: 'black'
                                                    }}
                                                >
                                                    <i
                                                        className={`glyphicon glyphicon-eye-${
                                                            openPassword.re_password
                                                                ? 'close'
                                                                : 'open'
                                                        }`}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Quyền</label>
                                            <select
                                                required
                                                name="role"
                                                className="form-control"
                                                value={data.role || ''}
                                                onChange={changeData}
                                            >
                                                <option value="">
                                                    -- Chọn quyền --
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="member">
                                                    Member
                                                </option>
                                            </select>
                                        </div>
                                        <button
                                            name="sbm"
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Thêm mới
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-default"
                                        >
                                            Làm mới
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddUser;
