import { Link, useNavigate, useParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { getAdminCategory, updateCategory } from '../../../services/Api';
import { useEffect, useState } from 'react';

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [categoryOrigin, setCategoryOrigin] = useState({});
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    //
    const changeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const resetData = () => {
        setData({});
        setError(null);
    };
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await updateCategory(id, data);
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
        (async () => {
            try {
                const { docs } = (await getAdminCategory(id)).data.data;
                setCategoryOrigin(docs);
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
            <Head title={'Chỉnh sửa danh mục'} />
            <Header />
            <Sidebar activeSidebar={'categories'} />
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
                            <Link to={'/admin/categories'}>
                                Quản lý danh mục
                            </Link>
                        </li>
                        <li className="active">{categoryOrigin.name}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Danh mục: {categoryOrigin.name}
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
                                            Danh mục đã tồn tại !
                                        </div>
                                    )}
                                    <form
                                        role="form"
                                        method="post"
                                        onReset={resetData}
                                        onSubmit={handleUpdateCategory}
                                    >
                                        <div className="form-group">
                                            <label>Tên danh mục:</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                className="form-control"
                                                placeholder="Tên danh mục..."
                                                value={
                                                    data.name ||
                                                    categoryOrigin.name
                                                }
                                                onChange={changeData}
                                            />
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
                </div>{' '}
                {/*/.main*/}
            </div>
        </>
    );
};

export default EditCategory;
