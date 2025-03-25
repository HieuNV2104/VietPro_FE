import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckAdmin = (OriginComponent) => {
    const ExtendsComponent = () => {
        const login = useSelector(({ userReducer }) => userReducer.login);
        return login.loggedIn ? (
            login.currentUser && login.currentUser.role === 'admin' ? (
                <OriginComponent />
            ) : (
                <Navigate to={'/admin/login'} />
            )
        ) : (
            <Navigate to={'/admin/login'} />
        );
    };
    return ExtendsComponent;
};

export default CheckAdmin;
