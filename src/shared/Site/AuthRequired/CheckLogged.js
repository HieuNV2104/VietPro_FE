import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckLogged = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(
            ({ customerReducer }) => customerReducer.login
        );
        return login.loggedIn ? <Navigate to={'/'} /> : <OriginComponent />;
    };
    return ExtendsComponent;
};

export default CheckLogged;
