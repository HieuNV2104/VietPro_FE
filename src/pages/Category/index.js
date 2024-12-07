import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getProductsByCategory, getCategory } from '../../services/Api';
import ProductItem from '../../shared/components/ProductItem';
import Pagination from '../../shared/components/Pagination';

const Category = () => {
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [categoryName, setCategoryName] = useState('');
    const [pages, setPages] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;

    useEffect(() => {
        // Get Products
        getProductsByCategory(id, {
            params: {
                limit: 6,
                page
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
            .then(({ data }) => setCategoryName(data.data.name))
            .catch((error) => console.log(error));
    }, [id, page]);

    return (
        <>
            <div>
                <div className="products">
                    <h3>{`${categoryName} hiện có ${total} sản phẩm`}</h3>
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

export default Category;
