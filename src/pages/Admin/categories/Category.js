import { Link } from 'react-router-dom';
import Head from '../../../shared/Admin/components/Layout/Head';
import Header from '../../../shared/Admin/components/Layout/Header';
import Sidebar from '../../../shared/Admin/components/Layout/Sidebar';
import Pagination from '../../../shared/Admin/components/Pagination';
import { getCategories } from '../../../services/Api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Category = () => {
    //state
    const [categories, setCategories] = useState([]);
    const [pages, setPages] = useState({});

    // page
    const [searchParams, setSearchParams] = useSearchParams();
    const page = +searchParams.get('page') || 1;

    // call APi
    useEffect(() => {
        (async () => {
            try {
                // API Categories
                const { docs, pages } = (
                    await getCategories({
                        params: {
                            limit: 2,
                            page
                        }
                    })
                ).data.data;
                setCategories(docs);
                setPages(pages);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [page]);

    return (
        <>
            <Head title={'Quản lý danh mục'} />
            <Header />
            <Sidebar activeSidebar={'categories'} />
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <Link href="#">
                                <svg className="glyph stroked home">
                                    <use xlinkHref="#stroked-home" />
                                </svg>
                            </Link>
                        </li>
                        <li className="active">Quản lý danh mục</li>
                    </ol>
                </div>
                {/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Quản lý danh mục</h1>
                    </div>
                </div>
                {/*/.row*/}
                <div id="toolbar" className="btn-group">
                    <Link href="category-add.html" className="btn btn-success">
                        <i className="glyphicon glyphicon-plus" /> Thêm danh mục
                    </Link>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <table
                                    data-toolbar="#toolbar"
                                    data-toggle="table"
                                >
                                    <thead>
                                        <tr>
                                            <th
                                                data-field="id"
                                                data-sortable="true"
                                            >
                                                ID
                                            </th>
                                            <th>Tên danh mục</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((category, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{category?._id}</td>
                                                    <td>{category?.name}</td>
                                                    <td className="form-group">
                                                        <Link
                                                            href="/"
                                                            className="btn btn-primary"
                                                        >
                                                            <i className="glyphicon glyphicon-pencil" />
                                                        </Link>
                                                        <Link
                                                            href="/"
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
                            <Pagination pages={pages} />
                        </div>
                    </div>
                </div>
                {/*/.row*/}
            </div>{' '}
            {/*/.main*/}
        </>
    );
};

export default Category;
