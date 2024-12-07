import { useEffect, useState } from 'react';
import { getProducts } from '../../services/Api';
import ProductItem from '../../shared/components/ProductItem';

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        getProducts({
            params: {
                limit: 6
            }
        })
            .then(({ data }) => setLatestProducts(data.data.docs))
            .catch((error) => console.log(error));
        getProducts({
            params: {
                limit: 6,
                is_featured: true
            }
        })
            .then(({ data }) => setFeaturedProducts(data.data.docs))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div>
                <div className="products">
                    <h3>Sản phẩm nổi bật</h3>
                    <div className="product-list card-deck">
                        {featuredProducts?.map((items, index) => {
                            return (
                                <ProductItem key={items?._id} items={items} />
                            );
                        })}
                    </div>
                </div>
                <div className="products">
                    <h3>Sản phẩm mới</h3>
                    <div className="product-list card-deck">
                        {latestProducts?.map((items, index) => {
                            return (
                                <ProductItem key={items?._id} items={items} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
