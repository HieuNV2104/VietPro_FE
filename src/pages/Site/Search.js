import { getProducts } from '../../services/Api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductItem from '../../shared/Site/components/ProductItem';
import Pagination from '../../shared/Site/components/Pagination';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [pages, setPages] = useState({});

    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get('name');
    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        getProducts({
            params: {
                name,
                limit: 6,
                page
            }
        })
            .then(({ data }) => {
                // Set Products
                setProducts(data.data.docs);
                // Set Pages
                setPages(data.data.pages);
            })
            .catch((error) => console.log(error));
    }, [name, page]);

    return (
        <>
            <div>
                <div className="products">
                    <div id="search-result">
                        Kết quả tìm kiếm với sản phẩm{' '}
                        <span style={{ fontSize: 14 }}>{name}</span>
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
