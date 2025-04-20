import Head from '../../shared/Admin/components/Layout/Head';
import { loginUser } from '../../services/Api';
import { loginUserSuccess } from '../../redux-setup/reducers/userReducer';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
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
    const login = async (e) => {
        e.preventDefault();
        try {
            const res = (await loginUser(data)).data;
            dispatch(
                loginUserSuccess({ ...res.user, accessToken: res.accessToken })
            );
            navigate('/admin/dashboard');
        } catch (error) {
            console.log('e: ', error);

            console.log(error.response);

            if (error.response.data === 'email not valid') {
                return setError('Email sai !');
            }
            if (error.response.data === 'password not valid') {
                return setError('Mật khẩu sai !');
            }
            return console.log(error);
        }
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
        <>
            <Head title={'Login Admin'} />
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            Vietpro Mobile Shop - Administrator
                        </div>
                        <div className="panel-body">
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}
                            <form method="post" onSubmit={login}>
                                <fieldset>
                                    <div className="form-group">
                                        <input
                                            required
                                            className="form-control"
                                            placeholder="E-mail"
                                            name="email"
                                            type="email"
                                            autofocus
                                            onChange={changeData}
                                        />
                                    </div>
                                    <div className="form-group box-password">
                                        <input
                                            required
                                            className="form-control"
                                            placeholder="Mật khẩu"
                                            name="password"
                                            type={
                                                openPassword.password
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            onChange={changeData}
                                        />
                                        <Link
                                            onClick={() =>
                                                changeOpenPassword('password')
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
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Đăng nhập
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
