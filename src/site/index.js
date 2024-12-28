import Header from '../shared/Site/components/Layout/Header';
import Footer from '../shared/Site/components/Layout/Footer';
import Menu from '../shared/Site/components/Layout/Menu';
import Slider from '../shared/Site/components/Layout/Slider';
import Sidebar from '../shared/Site/components/Layout/Sidebar';
import routers from '../routers/site';
import { Routes, Route } from 'react-router-dom';

const SiteApp = () => {
    return (
        <>
            {/* Header */}
            <Header />
            {/* Body */}
            <div id="body">
                <div className="container">
                    <Menu />
                    <div className="row">
                        <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                            <Slider />
                            <Routes>
                                {routers.map((router, index) => {
                                    return (
                                        <Route
                                            key={index}
                                            path={router.path}
                                            element={<router.element />}
                                        />
                                    );
                                })}
                            </Routes>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </div>
            {/* Footer  */}
            <Footer />
        </>
    );
};

export default SiteApp;
