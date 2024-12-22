import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}:any) => {
  const { token } = useSelector((state:any)=>state.auth);


  if(token !== null){
    return children;
  }
  else{
    return <Navigate to={"/login"} />
  }
}

export default PrivateRoute
