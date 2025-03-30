import { Link, useNavigate, useParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import { updateUser, getUser } from '../../../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSuccess } from '../../../redux-setup/reducers/userReducer';

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(({ userReducer }) => userReducer.login);
    const { id } = useParams();
    const [userOrigin, setUserOrigin] = useState({});
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [openPassword, setOpenPassword] = useState({
        password: false,
        new_password: false
    });
    //
    const changeOpenPassword = (name) => {
        setOpenPassword({ ...openPassword, [name]: !openPassword[name] });
    };
    const changeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const resetData = (e) => {
        e.preventDefault();
        setData({});
        setError(null);
    };
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            if (id === login?.currentUser?._id) {
                dispatch(
                    updateUserSuccess({
                        full_name: data.full_name,
                        email: data.email,
                        role: data.role
                    })
                );
            }
            const res = await updateUser(id, data);
            if (res.status === 200) {
                navigate('/admin/users');
            }
        } catch (error) {
            if (error.response.data === 'Blank password!') {
                setError('Nhập thiếu mật khẩu');
            }
            if (error.response.data === 'Wrong password!') {
                setError('Sai mật khẩu');
            }
            return console.log(error);
        }
    };
    //
    useEffect(() => {
        (async () => {
            try {
                const { docs } = (await getUser(id)).data.data;
                setUserOrigin(docs);
                setData(docs);
            } catch (error) {
                console.log(error);
            }
        })();
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
            <Head title={'Chỉnh sửa thành viên'} />
            <Header />
            <Sidebar activeSidebar={'users'} />
            <div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
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
                        <li className="active">{userOrigin.full_name}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Thành viên: {userOrigin.full_name}
                        </h1>
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
                                            {error}
                                        </div>
                                    )}
                                    <form
                                        role="form"
                                        method="post"
                                        onReset={resetData}
                                        onSubmit={handleUpdateUser}
                                    >
                                        <div className="form-group">
                                            <label>Họ &amp; Tên</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                required
                                                className="form-control"
                                                placeholder
                                                value={
                                                    data.full_name ||
                                                    userOrigin.full_name
                                                }
                                                onChange={changeData}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                disabled
                                                type="text"
                                                name="email"
                                                required
                                                className="form-control"
                                                value={
                                                    data.email ||
                                                    userOrigin.email
                                                }
                                                onChange={changeData}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Mật khẩu cũ</label>
                                            <div className="box-password">
                                                <input
                                                    placeholder="Mật khẩu cũ"
                                                    name="password"
                                                    type={
                                                        openPassword.password
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    className="form-control"
                                                    value={
                                                        data.password ||
                                                        userOrigin.password
                                                    }
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
                                            <label>Mật khẩu mới</label>
                                            <div className="box-password">
                                                <input
                                                    placeholder="Mật khẩu mới"
                                                    name="new_password"
                                                    type={
                                                        openPassword.new_password
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    className="form-control"
                                                    value={
                                                        data.new_password || ''
                                                    }
                                                    onChange={changeData}
                                                />
                                                <Link
                                                    onClick={() =>
                                                        changeOpenPassword(
                                                            'new_password'
                                                        )
                                                    }
                                                    className="icon-password"
                                                    style={{
                                                        color: 'black'
                                                    }}
                                                >
                                                    <i
                                                        className={`glyphicon glyphicon-eye-${
                                                            openPassword.new_password
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
                                                name="role"
                                                className="form-control"
                                                value={
                                                    data.role || userOrigin.role
                                                }
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
                                            type="submit"
                                            name="sbm"
                                            className="btn btn-primary"
                                        >
                                            Cập nhật
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
                    {/* /.col*/}
                </div>
                {/* /.row */}
                {/*/.main*/}
            </div>
        </>
    );
};

export default EditUser;
