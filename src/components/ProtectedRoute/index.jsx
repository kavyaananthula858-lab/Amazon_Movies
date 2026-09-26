import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({children}) => Cookies.get('jwt_token') ? children : <Navigate to="/login" replace />

export default ProtectedRoute
