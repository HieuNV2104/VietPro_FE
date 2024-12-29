import { Routes, Route } from 'react-router-dom';
import routers from '../routers/admin';

const AdminApp = () => {
    return (
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
    );
};

export default AdminApp;
