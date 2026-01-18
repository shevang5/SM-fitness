import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (role && user.role !== role) {
        // If admin tries to go to flexible dashboard or vice versa? 
        // Usually redirect to their own dashboard.
        return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />;
    }

    return children;
};

export default PrivateRoute;
