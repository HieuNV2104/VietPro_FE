import Head from '../../shared/Admin/components/Layout/Head';

const Login = () => {
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
                            <div className="alert alert-danger">
                                Tài khoản không hợp lệ !
                            </div>
                            <form method="post">
                                <fieldset>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            placeholder="E-mail"
                                            name="email"
                                            type="email"
                                            autofocus
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            placeholder="Mật khẩu"
                                            name="password"
                                            type="password"
                                            defaultValue
                                        />
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input
                                                name="remember"
                                                type="checkbox"
                                                defaultValue="Remember Me"
                                            />
                                            Nhớ tài khoản
                                        </label>
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
