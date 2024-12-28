import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import SiteApp from './site';
import AdminApp from './admin';
import { store, persistor } from './redux-setup/store';
// import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<SiteApp />} />
                        <Route path="/admin/*" element={<AdminApp />} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
