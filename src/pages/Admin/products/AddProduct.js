import { Link } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { getCategories, getSales } from '../../../services/Api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../services/Api';

const AddProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [sales, setSales] = useState([]);
    const [image, setImage] = useState('');
    const [data, setData] = useState({});
    //
    const changeImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setData({ ...data, image: e.target.files[0] });
    };
    const changeData = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === 'checkbox' ? checked : value });
    };
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await createProduct(formData);
            if (res.status === 200) {
                navigate('/admin/products');
            } else {
                alert('Thêm sản phẩm không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const resetData = () => {
        setData({});
        setImage('');
    };
    //
    useEffect(() => {
        // call APIAPI
        (async () => {
            try {
                const { docs: categoriesDocs } = (
                    await getCategories({ params: { limit: 100 } })
                ).data.data;
                setCategories(categoriesDocs);
                //
                const { docs: salesDocs } = (await getSales()).data.data;
                setSales(salesDocs);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    //
    return (
        <>
            <Head title={'Thêm sản phẩm'} />
            <Header />
            <Sidebar activeSidebar={'products'} />
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
                            <Link to={'/admin/products'}>Quản lý sản phẩm</Link>
                        </li>
                        <li className="active">Thêm sản phẩm</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm sản phẩm</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form
                                    role="form"
                                    method="post"
                                    encType="multipart/form-data"
                                    onSubmit={handleCreateProduct}
                                    onReset={resetData}
                                >
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label>Tên sản phẩm</label>
                                            <input
                                                required
                                                name="name"
                                                className="form-control"
                                                placeholder
                                                onChange={changeData}
                                                value={data.name || ''}
                                            />
                                            <div className="form-group">
                                                <label>Giá sản phẩm</label>
                                                <input
                                                    required
                                                    name="price"
                                                    type="number"
                                                    min={1}
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.price || ''}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Bảo hành</label>
                                                <input
                                                    required
                                                    name="warranty"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.warranty || ''}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phụ kiện</label>
                                                <input
                                                    required
                                                    name="accessories"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.accessories || ''
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Khuyến mãi</label>
                                                <input
                                                    required
                                                    name="promotion"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.promotion || ''}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Tình trạng</label>
                                                <input
                                                    required
                                                    name="status"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.status || ''}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Số lượng</label>
                                                <input
                                                    required
                                                    name="qty"
                                                    type="number"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.qty || ''}
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Ảnh sản phẩm</label>
                                                <input
                                                    required
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={changeImage}
                                                />
                                                <br />
                                                {image && (
                                                    <div>
                                                        <img
                                                            style={{
                                                                width: 130,
                                                                height: 180
                                                            }}
                                                            src={image}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label>Danh mục</label>
                                                <select
                                                    required
                                                    name="category_id"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.category_id || ''
                                                    }
                                                >
                                                    <option value="">
                                                        -- Chọn danh mục --
                                                    </option>
                                                    {categories?.map(
                                                        (category) => {
                                                            return (
                                                                <option
                                                                    key={
                                                                        category._id
                                                                    }
                                                                    value={
                                                                        category._id
                                                                    }
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Chương trình Khuyến mãi
                                                </label>
                                                <select
                                                    name="sale"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.sale || ''}
                                                >
                                                    <option value="">
                                                        -- Chọn khuyến mãi --
                                                    </option>
                                                    {sales?.map((sale) => {
                                                        return (
                                                            <option
                                                                key={sale._id}
                                                                value={sale._id}
                                                            >
                                                                {sale.code}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            {/* <div className="form-group">
                                                <label>Trạng thái</label>
                                                <select
                                                    required
                                                    name="is_stock"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={data.is_stock || ''}
                                                >
                                                    <option value="">
                                                        -- Chọn trạng thái --
                                                    </option>
                                                    <option value={true}>
                                                        Còn hàng
                                                    </option>
                                                    <option value={false}>
                                                        Hết hàng
                                                    </option>
                                                </select>
                                            </div> */}
                                            <div className="form-group">
                                                <label>Sản phẩm nổi bật</label>
                                                <div className="checkbox">
                                                    <label>
                                                        <input
                                                            name="is_featured"
                                                            type="checkbox"
                                                            onChange={
                                                                changeData
                                                            }
                                                            value={
                                                                data.is_featured ||
                                                                ''
                                                            }
                                                        />
                                                        Nổi bật
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Mô tả sản phẩm</label>
                                                <div>
                                                    <textarea
                                                        className="form-control"
                                                        rows={3}
                                                        required
                                                        name="details"
                                                        value={
                                                            data.details || ''
                                                        }
                                                        onChange={changeData}
                                                    ></textarea>
                                                </div>
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
                                        </div>
                                    </div>
                                </form>
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

export default AddProduct;
