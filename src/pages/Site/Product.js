import {
    getProduct,
    getCommentsByProduct,
    createComment,
    getSale
} from '../../services/Api';
import { getImageProduct } from '../../shared/ultils';
import { useState, useEffect } from 'react';
import {
    useParams,
    useSearchParams,
    useNavigate,
    Link
} from 'react-router-dom';
import Pagination from '../../shared/Site/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux-setup/reducers/cartReducer';
import { formatPrice, formatDate } from '../../shared/ultils';

const Product = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [price, setPrice] = useState(0);
    const [product, setProduct] = useState(null);
    const [comments, setComments] = useState([]);
    const [data, setData] = useState({});
    const [pages, setPages] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    // get page number
    const page = Number(searchParams.get('page')) || 1;
    // get id product
    const { id } = useParams();
    // data user
    const user = useSelector(({ customerReducer }) => customerReducer.login);
    // value comment
    const getValueComment = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // send comment
    const handleSendCommnet = (e) => {
        e.preventDefault();
        setData({
            ...data,
            name: user.currentCustomer.fullName,
            email: user.currentCustomer.email
        });
        createComment(id, data)
            .then(({ data }) => {
                getCommnets(id);
                data.status === 'success' && setData({});
            })
            .catch((error) => console.log(error));
    };

    // get commmets
    const getCommnets = (id) => {
        getCommentsByProduct(id, {
            params: {
                limit: 6,
                page
            }
        })
            .then(({ data }) => {
                // Set Comments
                setComments(data.data.docs);
                // Set Pages
                setPages(data.data.pages);
            })
            .catch((error) => console.log(error));
    };

    // add cart
    const handleAddCart = (e) => {
        dispatch(
            addToCart({
                _id: product?._id,
                name: product?.name,
                price: price,
                image: product?.image,
                qty: 1,
                qtyOnStock: +product?.qty
            })
        );
        e.target.name === 'buynow' && navigate('/cart');
    };
    //
    const changePrice = async (data, price) => {
        if (data) {
            const { docs: sale } = (await getSale(data)).data.data;
            if (sale.status === 'valid') {
                if (sale.type === 'percent') {
                    setPrice(price - (price * sale.value) / 100);
                }
                if (sale.type === 'direct') {
                    setPrice(price - sale.value > 0 ? price - sale.value : 0);
                }
            }
        }
    };
    // call API
    useEffect(() => {
        getProduct(id, {})
            .then(({ data }) => {
                setProduct(data.data.docs);
                setPrice(data.data.docs.price);
                changePrice(data.data.docs.sale, data.data.docs.price);
            })
            .catch((error) => console.log(error));

        getCommnets(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div>
            <div id="product">
                <div id="product-head" className="row">
                    <div
                        id="product-img"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <img src={getImageProduct(product?.image)} alt="img" />
                    </div>
                    <div
                        id="product-details"
                        className="col-lg-6 col-md-6 col-sm-12"
                    >
                        <h1>{product?.name}</h1>
                        <ul>
                            <li>
                                <span>Bảo hành:</span> {product?.warranty}
                            </li>
                            <li>
                                <span>Đi kèm:</span> {product?.accessories}
                            </li>
                            <li>
                                <span>Tình trạng:</span> {product?.status}
                            </li>
                            <li>
                                <span>Khuyến Mại:</span> {product?.promotion}
                            </li>
                            <li>
                                <span>Số lượng:</span> {product?.qty}
                            </li>
                            <li id="price">Giá Bán</li>
                            <li id="price-number">{formatPrice(price)}</li>
                            {product ? (
                                product.is_stock ? (
                                    <li id="status">Còn hàng</li>
                                ) : (
                                    <li id="status" style={{ color: 'red' }}>
                                        Hết hàng
                                    </li>
                                )
                            ) : (
                                ''
                            )}
                        </ul>
                        <div id="add-cart">
                            {product ? (
                                product?.is_stock ? (
                                    <>
                                        <button
                                            onClick={(e) => handleAddCart(e)}
                                            name="buynow"
                                            className="btn btn-warning mr-2"
                                        >
                                            Mua ngay
                                        </button>
                                        <button
                                            onClick={(e) => handleAddCart(e)}
                                            name="addcart"
                                            className="btn btn-info"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        class="btn btn-secondary btn-lg"
                                        disabled
                                    >
                                        Hết hàng
                                    </button>
                                )
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {product?.name}</h3>
                        <p>
                            {product?.details &&
                                product?.details
                                    .split('\n \r')
                                    .map((value, index) => {
                                        return <p key={index}>{value}</p>;
                                    })}
                        </p>
                    </div>
                </div>
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        {user.loggedIn ? (
                            <form method="post">
                                <div className="form-group">
                                    <label for="content">Nội dung:</label>
                                    <textarea
                                        name="content"
                                        required
                                        rows={8}
                                        className="form-control"
                                        id="content"
                                        value={data.content || ''}
                                        onChange={(e) => getValueComment(e)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    name="sbm"
                                    className="btn btn-primary"
                                    onClick={(e) => handleSendCommnet(e)}
                                >
                                    Gửi
                                </button>
                            </form>
                        ) : (
                            <Link to={'/login'} className="btn btn-primary">
                                Đăng nhập để bình luận
                            </Link>
                        )}
                    </div>
                </div>
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        {comments?.map((value) => {
                            return (
                                <div key={value._id} className="comment-item">
                                    <ul>
                                        <li>
                                            <b>{value.name}</b>
                                        </li>
                                        <li>{formatDate(value.createdAt)}</li>
                                        <li>
                                            <p>{value.content}</p>
                                        </li>
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Pagination pages={pages} />
        </div>
    );
};

export default Product;
