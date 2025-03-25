import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckLogged = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(({ userReducer }) => userReducer.login);
        return login.loggedIn ? (
            <Navigate to={'/admin/dashboard'} />
        ) : (
            <OriginComponent />
        );
    };
    return ExtendsComponent;
};

export default CheckLogged;
