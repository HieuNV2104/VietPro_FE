import { getProducts } from '../../services/Api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../../shared/Site/components/ProductItem';
import Filter from '../../shared/Site/components/Filter';
import Pagination from '../../shared/Site/components/Pagination';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState({});
    const [sort, setSort] = useState('_idv-1');
    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get('name');
    const page = Number(searchParams.get('page')) || 1;

    const changeSort = (value) => {
        setSort(value);
        setSearchParams({ page: 1, name });
    };

    useEffect(() => {
        getProducts({
            params: {
                is_stock: true,
                name,
                limit: 6,
                page,
                sort
            }
        })
            .then(({ data }) => {
                // Set Products
                setProducts(data.data.docs);
                // Set Pages
                setPages(data.data.pages);
            })
            .catch((error) => console.log(error));
    }, [name, page, sort]);

    return (
        <>
            <div>
                <div className="products">
                    <div className="above-products">
                        <h3>
                            Kết quả tìm kiếm với sản phẩm{' '}
                            <span style={{ fontSize: 'inherit', color: 'red' }}>
                                {name}
                            </span>
                        </h3>
                        <Filter changeSort={changeSort} />
                    </div>
                    <div className="product-list card-deck">
                        {products?.map((items, index) => {
                            return <ProductItem key={index} items={items} />;
                        })}
                    </div>
                </div>
                <Pagination pages={pages} />
            </div>
        </>
    );
};

export default Search;
