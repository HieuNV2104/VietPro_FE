import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import {
    getAdminProduct,
    updateProduct,
    getCategories,
    getSales
} from '../../../services/Api';
import { getImageProduct } from '../../../shared/ultils';

const EditProduct = () => {
    const [sales, setSales] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productOrigin, setProductOrigin] = useState({});
    const [data, setData] = useState({});
    const [imageOrigin, setImageOrigin] = useState('');
    const [image, setImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    //
    const changeImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setData({ ...data, image: e.target.files[0] });
        setImageOrigin('');
    };
    const changeData = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === 'checkbox' ? checked : value });
    };
    const resetData = (e) => {
        e.preventDefault();
        setData({});
        setImageOrigin(productOrigin.image);
        setImage('');
    };
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await updateProduct(id, formData);
            if (res.status === 200) {
                navigate('/admin/products');
            } else {
                alert('Chỉnh sửa sản phẩm không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //
    useEffect(() => {
        (async () => {
            try {
                const { docs: productDocs } = (await getAdminProduct(id)).data
                    .data;
                setProductOrigin(productDocs);
                setData(productDocs);
                setImageOrigin(productDocs.image);
                //
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
    return (
        <>
            <Head title={'Chỉnh sửa sản phẩm'} />
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
                        <li className="active">{productOrigin.name}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Sản phẩm: {productOrigin.name}
                        </h1>
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
                                    onSubmit={handleUpdateProduct}
                                    onReset={resetData}
                                >
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <label>Tên sản phẩm</label>
                                            <input
                                                name="name"
                                                className="form-control"
                                                placeholder
                                                onChange={changeData}
                                                value={
                                                    data.name ||
                                                    productOrigin.name
                                                }
                                            />
                                            <div className="form-group">
                                                <label>Giá sản phẩm</label>
                                                <input
                                                    name="price"
                                                    type="number"
                                                    min={1}
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.price ||
                                                        productOrigin.price
                                                    }
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
                                                    value={
                                                        data.warranty ||
                                                        productOrigin.warranty
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phụ kiện</label>
                                                <input
                                                    name="accessories"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.accessories ||
                                                        productOrigin.accessories
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Khuyến mãi</label>
                                                <input
                                                    name="promotion"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.promotion ||
                                                        productOrigin.promotion
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Tình trạng</label>
                                                <input
                                                    name="status"
                                                    type="text"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.status ||
                                                        productOrigin.status
                                                    }
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
                                                    value={
                                                        data.qty ||
                                                        productOrigin.qty
                                                    }
                                                    min={0}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Ảnh sản phẩm</label>
                                                <input
                                                    name="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={changeImage}
                                                />
                                                <br />
                                                {imageOrigin && (
                                                    <div>
                                                        <img
                                                            style={{
                                                                width: 130,
                                                                height: 180
                                                            }}
                                                            src={getImageProduct(
                                                                imageOrigin
                                                            )}
                                                        />
                                                    </div>
                                                )}
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
                                                    name="category_id"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.category_id ||
                                                        productOrigin.category_id
                                                    }
                                                >
                                                    {categories?.map(
                                                        (category) => {
                                                            return (
                                                                <option
                                                                    selected={
                                                                        productOrigin.category_id ===
                                                                        category._id
                                                                    }
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
                                                    Chương trình khuyến mãi
                                                </label>
                                                <select
                                                    name="sale"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.sale ||
                                                        productOrigin.sale
                                                    }
                                                >
                                                    <option value="null">
                                                        -- Không áp dụng khuyến
                                                        mãi --
                                                    </option>
                                                    {sales?.map((sale) => {
                                                        return (
                                                            <option
                                                                selected={
                                                                    productOrigin.sale ===
                                                                    sale._id
                                                                }
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
                                                    name="is_stock"
                                                    className="form-control"
                                                    onChange={changeData}
                                                    value={
                                                        data.is_stock ??
                                                        productOrigin.is_stock
                                                    }
                                                >
                                                    <option
                                                        // selected={
                                                        //     productOrigin.is_stock
                                                        // }
                                                        value={true}
                                                    >
                                                        Còn hàng
                                                    </option>
                                                    <option
                                                        // selected={
                                                        //     !productOrigin.is_stock
                                                        // }
                                                        value={false}
                                                    >
                                                        Hết hàng
                                                    </option>
                                                </select>
                                            </div> */}
                                            <div className="form-group">
                                                <label>Sản phẩm nổi bật</label>
                                                <div className="checkbox">
                                                    <label>
                                                        <input
                                                            checked={
                                                                data.is_featured ??
                                                                productOrigin.is_featured
                                                            }
                                                            name="is_featured"
                                                            type="checkbox"
                                                            onChange={
                                                                changeData
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
                                                        name="details"
                                                        value={
                                                            data.details ||
                                                            productOrigin.details
                                                        }
                                                        onChange={changeData}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <button
                                                name="sbm"
                                                type="submit"
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

export default EditProduct;
