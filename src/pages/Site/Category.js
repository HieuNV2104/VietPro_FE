import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProductsByCategory, getCategory } from '../../services/Api';
import ProductItem from '../../shared/Site/components/ProductItem';
import Filter from '../../shared/Site/components/Filter';
import Pagination from '../../shared/Site/components/Pagination';

const Category = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [pages, setPages] = useState({});
    const [sort, setSort] = useState('_idv-1');
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    //
    // const loadMore = () => {
    //     const newLimit = limit + 6;
    //     setLimit(newLimit);
    //     console.log(newLimit);

    //     getProductsByCategory(id, {
    //         params: {
    //             limit: newLimit,
    //             page
    //         }
    //     })
    //         .then(({ data }) => {
    //             // Set Products
    //             setProducts(data.data.docs);
    //             // Set Total Products
    //             setTotal(data.data.pages.total);
    //             // Set Pages
    //             setPages(data.data.pages);
    //         })
    //         .catch((error) => console.log(error));
    // };
    // const init = () => {
    //     const newLimit = 6;
    //     setLimit(newLimit);
    //     console.log(newLimit);

    //     getProductsByCategory(id, {
    //         params: {
    //             limit: newLimit,
    //             page
    //         }
    //     })
    //         .then(({ data }) => {
    //             // Set Products
    //             setProducts(data.data.docs);
    //             // Set Total Products
    //             setTotal(data.data.pages.total);
    //             // Set Pages
    //             setPages(data.data.pages);
    //         })
    //         .catch((error) => console.log(error));
    // };
    //
    const changeSort = (value) => {
        setSort(value);
        setSearchParams({ page: 1 });
    };

    useEffect(() => {
        // setSort('_idv-1');
        // Get Products
        getProductsByCategory(id, {
            params: {
                limit: 6,
                page,
                is_stock: true,
                sort
            }
        })
            .then(({ data }) => {
                // Set Products
                setProducts(data.data.docs);
                // Set Total Products
                setTotal(data.data.pages.total);
                // Set Pages
                setPages(data.data.pages);
            })
            .catch((error) => console.log(error));
        // Get Category Name
        getCategory(id, {})
            .then(({ data }) => setCategoryName(data.data.docs.name))
            .catch((error) => console.log(error));
    }, [id, page, sort]);

    return (
        <div>
            <div className="products">
                <div className="above-products">
                    <h3
                        style={{ margin: 0 }}
                    >{`${categoryName} hiện có ${total} sản phẩm`}</h3>
                    <Filter changeSort={changeSort} />
                </div>
                <div className="product-list card-deck">
                    {products?.map((items, index) => {
                        return <ProductItem key={index} items={items} />;
                    })}
                </div>
            </div>
            <Pagination pages={pages} />
            {/* <button
                onClick={loadMore}
                type="button"
                className="d-block btn btn-primary"
            >
                Load More
            </button>
            <button onClick={init} type="button" className="btn btn-primary">
                Init
            </button> */}
        </div>
    );
};

export default Category;
