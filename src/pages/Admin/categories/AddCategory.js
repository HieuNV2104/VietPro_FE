import { Link, useNavigate } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import { createCategory } from '../../../services/Api';

const AddCategory = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [data, setData] = useState({});
    //
    const changeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const resetData = () => {
        setData({});
    };
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await createCategory(data);
            if (res.status === 200) {
                navigate('/admin/categories');
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
            <Head title={'Thêm danh mục'} />
            <Header />
            <Sidebar activeSidebar={'categories'} />
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
                            <Link to={'/admin/categories'}>
                                Quản lý danh mục
                            </Link>
                        </li>
                        <li className="active">Thêm danh mục</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm danh mục</h1>
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
                                            Danh mục đã tồn tại !
                                        </div>
                                    )}
                                    <form
                                        role="form"
                                        method="post"
                                        onReset={resetData}
                                        onSubmit={handleCreateCategory}
                                    >
                                        <div className="form-group">
                                            <label>Tên danh mục:</label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Tên danh mục..."
                                                onChange={changeData}
                                                value={data.name || ''}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            name="sbm"
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
                    {/* /.col*/}
                </div>{' '}
                {/*/.main*/}
            </div>
        </>
    );
};

export default AddCategory;
