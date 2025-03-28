import { Link } from 'react-router-dom';
import { getImageProduct, formatPrice } from '../../ultils';
import { getSaleDetail } from '../../../services/Api';
import { useState, useEffect } from 'react';

const ProductItem = ({ items }) => {
    const [sale, setSale] = useState(null);
    const [price, setPrice] = useState(items?.price);
    //
    const changePrice = (sale) => {
        if (sale.status === 'valid') {
            setSale(sale);
            if (sale.type === 'percent') {
                setPrice(price - (price * sale.value) / 100);
            }
            if (sale.type === 'direct') {
                setPrice(price - sale.value > 0 ? price - sale.value : 0);
            }
        }
    };
    //
    useEffect(() => {
        (async () => {
            try {
                if (items?.sale) {
                    const { docs } = (await getSaleDetail(items?.sale)).data
                        .data;
                    changePrice(docs);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    //
    return (
        <div className="product-item card text-center">
            <Link to={`/product-${items?._id}`}>
                <img src={getImageProduct(items?.image)} alt="img" />
            </Link>
            <h4>
                <Link to={`/product-${items?._id}`}>{items?.name}</Link>
            </h4>
            <p>
                {sale ? (
                    <>
                        <span
                            style={{
                                textDecoration: 'line-through',
                                color: '#6B727F'
                            }}
                        >
                            {formatPrice(items?.price)}
                        </span>
                        <span style={{ display: 'block', fontSize: 17 }}>
                            {formatPrice(price)}
                        </span>
                    </>
                ) : (
                    <span>{formatPrice(items?.price)}</span>
                )}
            </p>
        </div>
    );
};

export default ProductItem;
