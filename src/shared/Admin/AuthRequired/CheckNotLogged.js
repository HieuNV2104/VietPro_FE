import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckNotLogged = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(({ userReducer }) => userReducer.login);
        return login.loggedIn ? (
            <OriginComponent />
        ) : (
            <Navigate to={'/admin/login'} />
        );
    };
    return ExtendsComponent;
};

export default CheckNotLogged;
