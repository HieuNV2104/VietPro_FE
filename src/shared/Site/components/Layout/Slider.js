import { useEffect, useState } from 'react';
import { getSlider } from '../../../../services/Api';
import { getImageSlider } from '../../../ultils';
import { Link } from 'react-router-dom';

const Slider = () => {
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        getSlider({
            params: {
                limit: 10,
                sort: 1
                // publish: true
            }
        })
            .then(({ data }) => setSliders(data.data.docs))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div id="slide" className="carousel slide" data-ride="carousel">
            <ul className="carousel-indicators">
                {sliders?.map((slider, index) => {
                    return (
                        <li
                            key={index}
                            data-target="#slide"
                            data-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                        />
                    );
                })}
            </ul>
            <div className="carousel-inner">
                {sliders?.map((slider, index) => {
                    return (
                        <div
                            key={index}
                            className={`carousel-item ${
                                index === 0 ? 'active' : ''
                            }`}
                        >
                            <img
                                src={getImageSlider(slider.image)}
                                alt="Vietpro Academy"
                            />
                        </div>
                    );
                })}
            </div>
            <a
                className="carousel-control-prev"
                href="#slide"
                data-slide="prev"
            >
                <span className="carousel-control-prev-icon" />
            </a>
            <a
                className="carousel-control-next"
                href="#slide"
                data-slide="next"
            >
                <span className="carousel-control-next-icon" />
            </a>
        </div>
    );
};

export default Slider;
