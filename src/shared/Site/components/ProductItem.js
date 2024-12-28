import { Link } from 'react-router-dom';
import { getImageProduct } from '../../ultils';
import { formatPrice } from '../../ultils';

const ProductItem = ({ items }) => {
    return (
        <div className="product-item card text-center">
            <Link to={`/product-${items?._id}`}>
                <img src={getImageProduct(items?.image)} alt="img" />
            </Link>
            <h4>
                <Link to={`/product-${items?._id}`}>{items?.name}</Link>
            </h4>
            <p>
                Giá Bán: <span>{formatPrice(items?.price)}</span>
            </p>
        </div>
    );
};

export default ProductItem;
