import { Link } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBanner } from '../../../services/Api';

const AddBanner = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [data, setData] = useState({});
    //
    const changeImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setData({ image: e.target.files[0] });
    };
    const handleCreateBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await createBanner(formData);
            if (res.status === 200) {
                navigate('/admin/ads/banners');
            } else {
                alert('Thêm ảnh không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const resetData = () => {
        setImage('');
    };
    //
    return (
        <>
            <Head title={'Thêm ảnh banner'} />
            <Header />
            <Sidebar activeSidebar={'ads'} activeAds={'banners'} />
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
                            <Link to={'/admin/ads/banners'}>
                                Quản lý ảnh banner
                            </Link>
                        </li>
                        <li className="active">Thêm ảnh banner</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm ảnh banner</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-12">
                                    <form
                                        role="form"
                                        method="post"
                                        encType="multipart/form-data"
                                        onSubmit={handleCreateBanner}
                                        onReset={resetData}
                                    >
                                        <div className="form-group">
                                            <label>Ảnh banner</label>
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
                    {/* /.col*/}
                </div>
                {/* /.row */}
            </div>{' '}
            {/*/.main*/}
        </>
    );
};

export default AddBanner;
