import './App.css';
import Header from './shared/components/Layout/Header';
import Footer from './shared/components/Layout/Footer';
import Menu from './shared/components/Layout/Menu';
import Slider from './shared/components/Layout/Slider';
import Sidebar from './shared/components/Layout/Sidebar';
import routers from './routers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux-setup/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    {/* Header */}
                    <Header />
                    {/* Body */}
                    <div id="body">
                        <div className="container">
                            <Menu />
                            <div className="row">
                                <div
                                    id="main"
                                    className="col-lg-8 col-md-12 col-sm-12"
                                >
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
                    {/* Footer */}
                    <Footer />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
