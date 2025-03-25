import { Link, useNavigate, useParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState, useEffect } from 'react';
import { updateSale, getSale } from '../../../services/Api';

const EditSale = () => {
    const [type, setType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [saleOrigin, setSaleOrigin] = useState({});
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    //
    const handleChangeType = (e) => {
        const { name, value } = e.target;
        setType(value);
        setData({ ...data, [name]: value });
    };
    const changeData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const resetData = (e) => {
        e.preventDefault();
        setData({});
        setError(null);
        setType('');
    };
    const handleUpdateSale = async (e) => {
        e.preventDefault();
        try {
            const res = await updateSale(id, data);
            if (res.status === 200) {
                navigate('/admin/sales');
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
                const { docs } = (await getSale(id)).data.data;
                setSaleOrigin(docs);
                setData(docs);
                setType(docs.type);
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
            <Head title={'Chỉnh sửa Khuyến mãi'} />
            <Header />
            <Sidebar activeSidebar={'sales'} />
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
                            <Link to={'/admin/sales'}>Quản lý Khuyến mãi</Link>
                        </li>
                        <li className="active">{saleOrigin?.code}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Khuyến mãi: {saleOrigin?.code}
                        </h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-6">
                                    {error && (
                                        <div className="alert alert-danger">
                                            Khuyến mãi đã tồn tại !
                                        </div>
                                    )}
                                    <form
                                        role="form"
                                        method="post"
                                        onReset={resetData}
                                        onSubmit={handleUpdateSale}
                                    >
                                        <div className="form-group">
                                            <label>Mã khuyến mãi</label>
                                            <input
                                                required
                                                name="code"
                                                className="form-control"
                                                placeholder
                                                onChange={changeData}
                                                value={
                                                    data.code || saleOrigin.code
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Loại hình</label>
                                            <select
                                                onChange={handleChangeType}
                                                name="type"
                                                className="form-control"
                                                required
                                                value={
                                                    data.type || saleOrigin.type
                                                }
                                            >
                                                <option value="direct">
                                                    Giảm giá trực tiếp
                                                </option>
                                                <option value="percent">
                                                    Giảm theo phần trăm
                                                </option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Giá trị</label>
                                            <input
                                                required
                                                name="value"
                                                type="number"
                                                className="form-control"
                                                min={
                                                    type === 'percent'
                                                        ? 1
                                                        : 1000
                                                }
                                                max={type === 'percent' && 99}
                                                onChange={changeData}
                                                value={
                                                    data.value ||
                                                    saleOrigin.value
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Trạng thái</label>
                                            <select
                                                name="status"
                                                className="form-control"
                                                required
                                                onChange={changeData}
                                                value={
                                                    data.status ||
                                                    saleOrigin.status
                                                }
                                            >
                                                <option value="valid">
                                                    Còn hạn
                                                </option>
                                                <option value="expired">
                                                    Hết hạn
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
            </div>{' '}
            {/*/.main*/}
        </>
    );
};

export default EditSale;
