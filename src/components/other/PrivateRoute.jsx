import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = Cookies.get("token");

    return token ? children : <Navigate to='/login' />;
    }
export default PrivateRoute;