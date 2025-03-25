import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckNotLogged = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(
            ({ customerReducer }) => customerReducer.login
        );
        return login.loggedIn ? <OriginComponent /> : <Navigate to={'/'} />;
    };
    return ExtendsComponent;
};

export default CheckNotLogged;
