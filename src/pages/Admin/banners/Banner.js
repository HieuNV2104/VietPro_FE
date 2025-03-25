import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { useState, useEffect } from 'react';
import {
    getAdminBanners,
    hideBanner,
    showBanner,
    deleteBanner
} from '../../../services/Api';
import { getImageBanner } from '../../../shared/ultils';

const Banner = () => {
    const [idSearch, setIdSearch] = useState('');
    const [banners, setBanners] = useState([]);
    const [pages, setPages] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;
    // call API
    const callAPI = async (id) => {
        try {
            let params = {
                limit: 5,
                page
            };
            if (id) {
                params.id = id;
                params.page = 1;
            }
            const { docs, pages } = (
                await getAdminBanners({
                    params
                })
            ).data.data;
            setBanners(docs);
            setPages(pages);
        } catch (error) {
            console.log(error);
        }
    };
    //
    const searchId = (e) => {
        setIdSearch(e.target.value);
    };
    const handleSearch = () => {
        callAPI(idSearch);
    };
    //
    const handleDeleteBanner = async (id) => {
        const confirm = window.confirm('Bạn có muốn xóa ảnh này không ?');
        if (!confirm) return;

        try {
            const res = await deleteBanner(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa ảnh thành công!');
                }, 100);
            } else {
                alert('Xóa ảnh không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleHideBanner = async (id) => {
        const confirm = window.confirm('Bạn có muốn ẩn ảnh này không ?');
        if (!confirm) return;

        try {
            const res = await hideBanner(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã ẩn ảnh thành công!');
                }, 100);
            } else {
                alert('Ẩn ảnh không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleHShowBanner = async (id) => {
        const confirm = window.confirm('Bạn có muốn hiện ảnh này không ?');
        if (!confirm) return;

        try {
            const res = await showBanner(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã hiện ảnhn thành công!');
                }, 100);
            } else {
                alert('Hiện ảnhn không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //
    useEffect(() => {
        setIdSearch('');
        callAPI('');
    }, [page]);
    //
    return (
        <>
            <Head title={'Quản lý ảnh banner'} />
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
                        <li className="active">Danh sách ảnh Banner</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách ảnh Banner</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
                        to={'/admin/ads/banners/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm ảnh mới
                    </Link>
                    <Search
                        idSearch={idSearch}
                        searchId={searchId}
                        handleSearch={handleSearch}
                    />
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table
                                    data-toolbar="#toolbar"
                                    data-toggle="table"
                                    className="table table-hover table-sm table-bordered"
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                data-field="id"
                                                data-sortable="true"
                                            >
                                                ID
                                            </th>
                                            <th
                                                data-field="name"
                                                data-sortable="true"
                                            >
                                                Ảnh
                                            </th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {banners?.map((banner) => {
                                            return (
                                                <tr key={banner?._id}>
                                                    <td>{banner?._id}</td>
                                                    <td>
                                                        <td
                                                            style={{
                                                                textAlign:
                                                                    'center'
                                                            }}
                                                        >
                                                            <img
                                                                style={{
                                                                    maxWidth: 700
                                                                }}
                                                                src={getImageBanner(
                                                                    banner?.image
                                                                )}
                                                                alt="img"
                                                            />
                                                        </td>
                                                    </td>
                                                    <td>
                                                        <span
                                                            style={{
                                                                fontSize: 14
                                                            }}
                                                            className={`label label-${
                                                                banner?.status ===
                                                                'show'
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {banner?.status ===
                                                            'show'
                                                                ? 'Hiện'
                                                                : 'Ẩn'}
                                                        </span>
                                                    </td>
                                                    <td className="form-group">
                                                        {banner?.status ===
                                                            'show' && (
                                                            <Link
                                                                onClick={() =>
                                                                    handleHideBanner(
                                                                        banner?._id
                                                                    )
                                                                }
                                                                className="btn btn-default "
                                                            >
                                                                <i className="glyphicon glyphicon-eye-close" />
                                                            </Link>
                                                        )}
                                                        {banner?.status ===
                                                            'hide' && (
                                                            <Link
                                                                onClick={() =>
                                                                    handleHShowBanner(
                                                                        banner?._id
                                                                    )
                                                                }
                                                                className="btn btn-success"
                                                            >
                                                                <i className="glyphicon glyphicon-eye-open" />
                                                            </Link>
                                                        )}
                                                        <Link
                                                            to={`/admin/ads/banners-${banner._id}/edit`}
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        <Link
                                                            onClick={() =>
                                                                handleDeleteBanner(
                                                                    banner?._id
                                                                )
                                                            }
                                                            className="btn btn-danger"
                                                        >
                                                            <i className="glyphicon glyphicon-remove" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {idSearch ? '' : <Pagination pages={pages} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;
