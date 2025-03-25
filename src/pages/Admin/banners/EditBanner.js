import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import { getBanner, updateBanner } from '../../../services/Api';
import { getImageBanner } from '../../../shared/ultils';

const EditBanner = () => {
    const [bannerOrigin, setBannerOrigin] = useState({});
    const [data, setData] = useState({});
    const [imageOrigin, setImageOrigin] = useState('');
    const [image, setImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    //
    const changeImage = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setData({ image: e.target.files[0] });
        setImageOrigin('');
    };

    const resetData = (e) => {
        e.preventDefault();
        setData({});
        setImageOrigin(bannerOrigin.image);
        setImage('');
    };
    const handleUpdateBanner = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const res = await updateBanner(id, formData);
            if (res.status === 200) {
                navigate('/admin/ads/banners');
            } else {
                alert('Chỉnh sửa ảnh không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //
    useEffect(() => {
        (async () => {
            try {
                const { docs } = (await getBanner(id)).data.data;
                setBannerOrigin(docs);
                setData(docs);
                setImageOrigin(docs.image);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    //
    return (
        <>
            <Head title={'Chỉnh sửad ảnh banner'} />
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
                        <li className="active">{bannerOrigin._id}</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">
                            Ảnh Banner: {bannerOrigin._id}
                        </h1>
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
                                        onSubmit={handleUpdateBanner}
                                        onReset={resetData}
                                    >
                                        <div className="form-group">
                                            <label>Ảnh banner</label>
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
                                                        src={getImageBanner(
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

export default EditBanner;
