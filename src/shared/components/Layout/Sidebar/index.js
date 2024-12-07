import { useEffect, useState } from 'react';
import { getBanner } from '../../../../services/Api';
import { getImageBanner } from '../../../ultils';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getBanner({
            params: {
                limit: 6,
                sort: 1
                // publish: true
            }
        })
            .then(({ data }) => setBanners(data.data.docs))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div id="sidebar" className="col-lg-4 col-md-12 col-sm-12">
            <div id="banner">
                {banners?.map((banner, index) => {
                    return (
                        <div key={index} className="banner-item">
                            <Link href="#">
                                <img
                                    className="img-fluid"
                                    src={getImageBanner(banner.image)}
                                    alt="banner"
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
