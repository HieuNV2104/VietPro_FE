import { Link, useSearchParams } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Search from '../../../shared/Admin/components/Search';
import Pagination from '../../../shared/Admin/components/Pagination';
import { useState, useEffect } from 'react';
import {
    getComments,
    deleteComment,
    hideComment,
    showComment
} from '../../../services/Api';

const Comment = () => {
    const [idSearch, setIdSearch] = useState('');
    const [comments, setCommnets] = useState([]);
    const [pages, setPages] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;
    // call API
    const callAPI = async (id) => {
        try {
            let params = {
                limit: 10,
                page
            };
            if (id) {
                params.id = id;
                params.page = 1;
            }
            const { docs, pages } = (
                await getComments({
                    params
                })
            ).data.data;
            setCommnets(docs);
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
    const handleDeleteComment = async (id) => {
        const confirm = window.confirm('Bạn có muốn xóa bình luận này không ?');
        if (!confirm) return;

        try {
            const res = await deleteComment(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã xóa bình luận thành công!');
                }, 100);
            } else {
                alert('Xóa bình luận không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleHideComment = async (id) => {
        const confirm = window.confirm('Bạn có muốn ẩn bình luận này không ?');
        if (!confirm) return;

        try {
            const res = await hideComment(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã ẩn bình luận thành công!');
                }, 100);
            } else {
                alert('Ẩn bình luận không thành công!');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleHShowComment = async (id) => {
        const confirm = window.confirm(
            'Bạn có muốn hiện bình luận này không ?'
        );
        if (!confirm) return;

        try {
            const res = await showComment(id);
            if (res.status === 200) {
                if (page > 1) {
                    setSearchParams({ page: 1 });
                } else {
                    callAPI();
                }
                setTimeout(() => {
                    alert('Bạn đã hiện bình luận thành công!');
                }, 100);
            } else {
                alert('Hiện bình luận không thành công!');
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
            <Head title={'Quản lý bình luận'} />
            <Header />
            <Sidebar activeSidebar={'comments'} />
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
                        <li className="active">Danh sách bình luận</li>
                    </ol>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách bình luận</h1>
                    </div>
                </div>
                <div id="toolbar" className="btn-group">
                    <Link
                        style={{ visibility: 'hidden' }}
                        to={'/admin/users/create'}
                        className="btn btn-success"
                    >
                        <i className="glyphicon glyphicon-plus" /> Thêm thành
                        viên
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
                                                Họ &amp; Tên
                                            </th>
                                            <th
                                                data-field="price"
                                                data-sortable="true"
                                            >
                                                Email
                                            </th>
                                            <th>Nội dung</th>
                                            <th>Trạng thái</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comments?.map((comment) => {
                                            return (
                                                <tr key={comment?._id}>
                                                    <td>{comment?._id}</td>
                                                    <td>{comment?.name}</td>
                                                    <td>{comment?.email}</td>
                                                    <td
                                                        style={{
                                                            maxWidth: 500
                                                        }}
                                                    >
                                                        {comment?.content}
                                                    </td>
                                                    <td>
                                                        <span
                                                            style={{
                                                                fontSize: 14
                                                            }}
                                                            className={`label label-${
                                                                comment?.status ===
                                                                'show'
                                                                    ? 'success'
                                                                    : 'danger'
                                                            }`}
                                                        >
                                                            {comment?.status ===
                                                            'show'
                                                                ? 'Hiện'
                                                                : 'Ẩn'}
                                                        </span>
                                                    </td>
                                                    <td className="form-group">
                                                        {comment?.status ===
                                                            'show' && (
                                                            <Link
                                                                onClick={() =>
                                                                    handleHideComment(
                                                                        comment?._id
                                                                    )
                                                                }
                                                                className="btn btn-default "
                                                            >
                                                                <i className="glyphicon glyphicon-eye-close" />
                                                            </Link>
                                                        )}
                                                        {comment?.status ===
                                                            'hide' && (
                                                            <Link
                                                                onClick={() =>
                                                                    handleHShowComment(
                                                                        comment?._id
                                                                    )
                                                                }
                                                                className="btn btn-success"
                                                            >
                                                                <i className="glyphicon glyphicon-eye-open" />
                                                            </Link>
                                                        )}
                                                        <Link
                                                            onClick={() =>
                                                                handleDeleteComment(
                                                                    comment?._id
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

export default Comment;
