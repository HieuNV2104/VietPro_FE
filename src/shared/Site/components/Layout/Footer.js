import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <div id="footer-top">
                <div className="container">
                    <div className="row">
                        <div
                            id="logo-2"
                            className="col-lg-3 col-md-6 col-sm-12"
                        >
                            <h2>
                                <Link href="#">
                                    <img
                                        className="img-fluid"
                                        // src="images/logo-footer.png"
                                        src="images/logo-shop.png"
                                        alt="img"
                                    />
                                </Link>
                            </h2>
                            <p>
                                Mobile Shop được thành lập với mục tiêu cung cấp
                                các sản phẩm điện thoại chính hãng, chất lượng
                                cao đến tay người tiêu dùng Việt Nam. Chúng tôi
                                cam kết mang đến trải nghiệm mua sắm trực tuyến
                                tiện lợi, minh bạch và chuyên nghiệp, cùng dịch
                                vụ chăm sóc khách hàng tận tâm và hậu mãi uy
                                tín.
                            </p>
                        </div>
                        <div
                            id="address"
                            className="col-lg-3 col-md-6 col-sm-12"
                        >
                            <h3>Địa chỉ</h3>
                            <p>Đại Kim - Hoàng Mai - Hà Nội</p>
                        </div>
                        <div
                            id="service"
                            className="col-lg-3 col-md-6 col-sm-12"
                        >
                            <h3>Dịch vụ</h3>
                            <p>Điện thoại mới</p>
                            <p>Điện thoại like new</p>
                        </div>
                        <div
                            id="hotline"
                            className="col-lg-3 col-md-6 col-sm-12"
                        >
                            <h3>Hotline</h3>
                            <p>Phone Sale: 0862142003</p>
                            <p>Email: hieu0226@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="footer-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <p>
                                2025 © Nguyen Van Hieu. All rights reserved.
                                Developed by Nguyen Van Hieu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
