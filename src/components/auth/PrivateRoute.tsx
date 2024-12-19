import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { logout } from "../../services/apiCall/auth";

const PrivateRoute = ({children}:any) => {
  const { token } = useSelector((state:any)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useDispatch();

  if(token !== null){
    return children;
  }
  else{
    logout(dispatch,navigate);
    return <Navigate to={"/login"} />
  }
}

export default PrivateRoute
